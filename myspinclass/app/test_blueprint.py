from flask import Blueprint
import json
import random
bp = Blueprint('bp', __name__)

@bp.route('/bluetooth/list-devices', methods=['GET'])
def bluetooth_search():
   return json.dumps({
        "devices" : ["TODO"]
    })
@bp.route('/bluetooth/connect/<device>', methods=['GET'])
def bluetooth_connect(device):
    if device == "SUCCESS":
        return "Success"
    return "Failure"

@bp.route('/bluetooth/<device>/disconnect', methods=['GET'])
def bluetooth_disconnect(device):
    return json.dumps("TODO")

@bp.route('/bluetooth/<device>/services', methods=['GET'])
def bluetooth_services(device):
    return json.dumps("TODO")
@bp.route('/bluetooth/device/characteristics', methods=['GET'])
def bluetooth_characteristic_list():
    return json.dumps("TODO")

@bp.route('/bluetooth/device/connect/speed', methods=['GET'])
def bluetooth_connect_speed():
    return "Connected to characteristic to read speed."

@bp.route('/bluetooth/device/read/speed', methods=['GET'])
def bluetooth_get_speed():
    rand_int = random.randint(0, 100)
    if rand_int < 33:
        speed = 12.5
    elif rand_int < 66:
        speed = 13.0
    else:
        speed = 13.5

    return json.dumps({
        "speed" : speed
    })

@bp.route('/workout/<workout_id>/<num_blocks>', methods=['GET'])
def get_workout(workout_id, num_blocks):
    def workout_factory():
        rand_int = random.randint(0,10)
        rand_time = random.randint(10, 30)
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