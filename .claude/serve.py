# Static dev server for the Vyla preview: same as `python3 -m http.server`,
# but tells the browser not to cache, so edits show up on reload.
import http.server, sys

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
http.server.ThreadingHTTPServer(('', port), NoCache).serve_forever()
