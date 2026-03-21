import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Mail, CheckCircle, XCircle, ShieldOff, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface EmailLog {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

const TIME_RANGES = [
  { label: "Last 24h", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "All time", value: "all" },
];

const PAGE_SIZE = 50;

const statusColor = (s: string) => {
  switch (s) {
    case "sent": return "default";
    case "failed": case "dlq": return "destructive";
    case "suppressed": return "secondary";
    default: return "outline";
  }
};

const AdminEmailsTab = () => {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let query = supabase
        .from("email_send_log")
        .select("id, message_id, template_name, recipient_email, status, error_message, created_at")
        .order("created_at", { ascending: false });

      if (timeRange !== "all") {
        const now = new Date();
        const ms = timeRange === "24h" ? 86400000 : timeRange === "7d" ? 604800000 : 2592000000;
        query = query.gte("created_at", new Date(now.getTime() - ms).toISOString());
      }

      const { data } = await query;
      setLogs((data as EmailLog[]) ?? []);
      setLoading(false);
      setPage(0);
    };
    load();
  }, [timeRange]);

  // Deduplicate by message_id (keep latest per message_id)
  const deduplicated = useMemo(() => {
    const map = new Map<string, EmailLog>();
    for (const row of logs) {
      const key = row.message_id ?? row.id;
      if (!map.has(key)) map.set(key, row);
    }
    return Array.from(map.values());
  }, [logs]);

  const templates = useMemo(
    () => [...new Set(deduplicated.map((l) => l.template_name))].sort(),
    [deduplicated]
  );

  const filtered = useMemo(() => {
    return deduplicated.filter((l) => {
      if (templateFilter !== "all" && l.template_name !== templateFilter) return false;
      if (statusFilter !== "all") {
        if (statusFilter === "failed" && l.status !== "failed" && l.status !== "dlq") return false;
        if (statusFilter !== "failed" && l.status !== statusFilter) return false;
      }
      return true;
    });
  }, [deduplicated, templateFilter, statusFilter]);

  const stats = useMemo(() => {
    const s = { total: filtered.length, sent: 0, failed: 0, suppressed: 0 };
    for (const l of filtered) {
      if (l.status === "sent") s.sent++;
      else if (l.status === "failed" || l.status === "dlq") s.failed++;
      else if (l.status === "suppressed") s.suppressed++;
    }
    return s;
  }, [filtered]);

  // Chart data: group filtered emails by date
  const chartData = useMemo(() => {
    const buckets = new Map<string, { date: string; sent: number; failed: number; suppressed: number }>();
    for (const l of filtered) {
      const date = new Date(l.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!buckets.has(date)) buckets.set(date, { date, sent: 0, failed: 0, suppressed: 0 });
      const b = buckets.get(date)!;
      if (l.status === "sent") b.sent++;
      else if (l.status === "failed" || l.status === "dlq") b.failed++;
      else if (l.status === "suppressed") b.suppressed++;
    }
    return Array.from(buckets.values()).reverse();
  }, [filtered]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  if (loading) return <p className="text-muted-foreground">Loading email analytics…</p>;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stats.total}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">{stats.sent}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-destructive">{stats.failed}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suppressed</CardTitle>
            <ShieldOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stats.suppressed}</p></CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {TIME_RANGES.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={templateFilter} onValueChange={setTemplateFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="All templates" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All templates</SelectItem>
            {templates.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="suppressed">Suppressed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Log table */}
      <Card>
        <CardHeader><CardTitle className="text-base">Email Log</CardTitle></CardHeader>
        <CardContent>
          {paged.length === 0 ? (
            <p className="text-sm text-muted-foreground">No emails match the current filters.</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium text-xs">{l.template_name}</TableCell>
                      <TableCell className="text-xs">{l.recipient_email}</TableCell>
                      <TableCell>
                        <Badge variant={statusColor(l.status)}>{l.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(l.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs text-destructive max-w-[200px] truncate">
                        {l.error_message ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-muted-foreground">
                  Page {page + 1} of {totalPages} ({filtered.length} emails)
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEmailsTab;
