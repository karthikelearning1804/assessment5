from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flaskext.mysql import MySQL
from flask_cors import CORS
import sys

mysql = MySQL()
app = Flask(__name__)
CORS(app)
port = 6200

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'assessment5'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)
api = Api(app)

class Login(Resource):
    def get(self, Email,Pwd,type):
        #data = request.get_json()
        conn = mysql.connect()
        cursor = conn.cursor()
        #Pwd = data['Pwd']
        #type = data['type']
        select_query = "select * from login where Email = %s and Pwd = %s and type1 = %s"
        query = (Email,Pwd,type)
        cursor.execute(select_query,query)
        rows = cursor.fetchall()
        if len(rows) > 0:
            resp = jsonify(rows)
            return {'Login': 'Success'}, 203
        return {'Login': 'Failed'}, 404

api.add_resource(Login, '/login/<string:Email>/<string:Pwd>/<string:type>')

app.run(port=port, debug=True)