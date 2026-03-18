import argparse
from flask import Flask, render_template, send_from_directory
import os

parser = argparse.ArgumentParser(description="Versemonger Server")
parser.add_argument("--front_path", type=str, help="Path to the frontend", default="../client/build")
parser.add_argument("--host", type=str, help="Host address", default="127.0.0.0")
parser.add_argument("--port", type=str, help="Port", default="80")
parser.add_argument("--debug", type=str, help="Debug mode", default=False)
args = parser.parse_args()

app = Flask(__name__,  static_folder=args.front_path, template_folder=args.front_path)

@app.route('/')
def serve_index():
    return render_template('index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({'users': [{'id': 1, 'name': 'Alice'}]})

if __name__ == '__main__':
    if args.debug:
        app.run(debug=args.debug, host=args.host, port=args.port)
    else:
        from waitress import serve
        serve(app, host=args.host, port=args.port)