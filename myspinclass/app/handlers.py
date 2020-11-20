import binascii

SPEED_FEET_PER_REVOLUTION = 1.0924137931
DISTANCE_FEET_PER_REVOLUTION = 5.16667
DISTANCE_SPEED_PER_REVOLUTION = 6.9 # Nice
FEET_PER_MILE = 5280




def handle_speed(handle, value):
    data = value.hex()
    flag = data[0:4]
    cadence = data[4:8]
    resistance = data[8:12]
    idk = data[12:]

    enc = binascii.unhexlify(cadence)
    cadence = int.from_bytes(enc, 'little')
    cadence = cadence / 2

    enc = binascii.unhexlify(resistance)
    resistance = int.from_bytes(enc, 'little', signed=True)
    

    mph = (cadence * SPEED_FEET_PER_REVOLUTION * 60) / FEET_PER_MILE

    mph = round(mph, 1)
    return mph


