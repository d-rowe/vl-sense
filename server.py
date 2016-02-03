from flask import Flask, render_template, abort
from flask_restful import reqparse, Api, Resource
from libs import convert

app = Flask(__name__)

##################################
#             API                #
##################################

api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('key')
parser.add_argument('notenames')
parser.add_argument('numerals')

class VLSense(Resource):

	def put(self):
		request = parser.parse_args()
		convert.convert(request)
		return request


api.add_resource(VLSense, '/api')

@app.route('/api', methods=['GET'])
def hideapi():
	abort(404)
	pass

##################################
#          Web Server            #
##################################

@app.route('/')
def mainpage():
    return "Welcome to MuseEddy"


@app.route('/editor')
def editor():
    return render_template('editor.html')


app.run(
	debug = True,
	host = '0.0.0.0',
	port = 8000,
)