''' myspinclass.routes.bluetooth_endpoints
'''
from flask import Blueprint
from pygatt.exceptions import NotConnectedError
from myspinclass.app.connections import DeviceConnection
from myspinclass.app.constants import TEST_DEVICE
import json

ble_bp = Blueprint('ble', __name__)
connection = DeviceConnection()
count = 0

@ble_bp.route('/bluetooth/list-devices', methods=['GET'])
def bluetooth_search():
   return json.dumps({
        "devices" : connection.scan()
    })
@ble_bp.route('/bluetooth/connect/<device>', methods=['GET'])
def bluetooth_connect(device):
    try:
        device = connection.connect(device)
    except NotConnectedError:
        return "Failure"
    return "Success"

@ble_bp.route('/bluetooth/<device>/disconnect', methods=['GET'])
def bluetooth_disconnect(device):
    pass

@ble_bp.route('/bluetooth/<device>/services', methods=['GET'])
def bluetooth_services(device):
    pass
@ble_bp.route('/bluetooth/device/characteristics', methods=['GET'])
def bluetooth_characteristic_list():
    return connection.scan_characteristics()

@ble_bp.route('/bluetooth/device/connect/speed', methods=['GET'])
def bluetooth_connect_speed():
    connection.connect_speed()
    return "Connected to characteristic to read speed."

@ble_bp.route('/bluetooth/device/read/speed', methods=['GET'])
def bluetooth_get_speed():
    return json.dumps({
        "speed" : connection.read_speed()
    })

@bp.route('/workout/<workout_id>/<num_blocks>', methods=['GET'])
def get_workout(workout_id, num_blocks):
    def workout_factory():
        rand_int = random.randint(0,10)
        rand_time = random.randint(30, 90)
        if rand_int < 5:
            return {
                "time" : rand_time,
                "intensity" : "BASE"
            }
        elif rand_int < 8:
            return {
                "time" : rand_time,
                "intensity" : "PUSH"
            }
        else:
            return {
                "time" : rand_time,
                "intensity": "SPRINT"
            }
    workout = []
    for _ in range(int(num_blocks)):
        workout.append(workout_factory())
    
    return json.dumps({
        "workout" : workout_id,
        "blocks" : workout
    })
