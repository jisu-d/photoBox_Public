from gpiozero import LED
from time import sleep

def lightingControl(type:str):
    relay = LED(14)

    if type == 'base':
        for _ in range(8):
            relay.off()
            sleep(6 + 1)
            relay.on()
            sleep(2 - 1)
    elif type == 'on':
        relay.off()
    elif type == 'off':
        relay.on()


