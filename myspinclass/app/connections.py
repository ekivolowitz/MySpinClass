''' myspinclass.app.connections
'''
from myspinclass.app.constants import _2ad2_characteristic
from myspinclass.app.handlers import handle_speed
import pygatt
import json

MOST_RECENT_SPEED = 0.0

def _handle_speed(handler, value):
    global MOST_RECENT_SPEED
    mph = handle_speed(handler, value)
    MOST_RECENT_SPEED = mph

class DeviceConnection(object):

    instance = None
    
    class __DeviceConnection(object):
        def __init__(self, address_type=pygatt.BLEAddressType.random):
            self.addr = None
            self.address_type = address_type
            self.adapt = pygatt.GATTToolBackend()
            self.adapt.start()
            self.device = None

    def __init__(self):
        if not DeviceConnection.instance:
            DeviceConnection.instance = DeviceConnection.__DeviceConnection()

    def scan(self):
        devices = DeviceConnection.instance.adapt.scan(run_as_root=True)
        DeviceConnection.instance.adapt.reset()
        return devices

    def connect(self, addr):
        
        DeviceConnection.instance.device = DeviceConnection.instance.adapt.connect(addr, address_type=DeviceConnection.instance.address_type)
        DeviceConnection.instance.addr = addr

    def scan_characteristics(self):
        val = DeviceConnection.instance.device.discover_characteristics()
        print(val)
        return val


    def connect_speed(self):
        DeviceConnection.instance.device.subscribe(_2ad2_characteristic, callback=_handle_speed)

    def read_speed(self):
        return MOST_RECENT_SPEED
