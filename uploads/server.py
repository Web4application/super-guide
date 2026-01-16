if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
  class FileUploadHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/upload":
            form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={
                'REQUEST_METHOD': 'POST',
                'CONTENT_TYPE': self.headers['Content-Type'],
            })
            file_field = form['file']
            if file_field.filename:
                filename = os.path.join(UPLOAD_DIR, file_field.filename)
                with open(filename, 'wb') as f:
                    f.write(file_field.file.read())
                self.send_response(200)
                self.wfile.write(f"File uploaded: {file_field.filename}".encode())
            else:
                self.send_response(400)
                self.wfile.write("No file uploaded.".encode())
        else:
            super().do_GET()
          def run(server_class=HTTPServer, handler_class=FileUploadHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server started on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
