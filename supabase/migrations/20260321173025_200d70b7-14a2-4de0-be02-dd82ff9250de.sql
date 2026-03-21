-- Allow admins to read email_send_log
CREATE POLICY "Admins can view email send log"
ON public.email_send_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read suppressed_emails
CREATE POLICY "Admins can view suppressed emails"
ON public.suppressed_emails
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));