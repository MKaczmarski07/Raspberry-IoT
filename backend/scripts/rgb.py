import time
import RPi.GPIO as GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

class Led_rgb(object):
    def __init__(self, led_red , led_green, led_blue):
        self.led_red = led_red
        self.led_green = led_green
        self.led_blue = led_blue
        self.define_pins()
        
    def define_pins(self):
        GPIO.setup(self.led_red,GPIO.OUT) # make pins into an output
        GPIO.setup(self.led_green,GPIO.OUT)
        GPIO.setup(self.led_blue,GPIO.OUT)

        self.led_red = GPIO.PWM(self.led_red,60) # At 60 Hz blinking will not be visible
        self.led_green = GPIO.PWM(self.led_green,60)
        self.led_blue = GPIO.PWM(self.led_blue,60)
     
    def set_color(self,r,g,b):
        self.start_pwn()
        self.led_red.ChangeDutyCycle(int((r*100)/255))
        self.led_green.ChangeDutyCycle(int((g*100)/255))
        self.led_blue.ChangeDutyCycle(int((b*100)/255))

    def start_pwn(self):
        self.led_red.start(0) 
        self.led_green.start(0)
        self.led_blue.start(0)
    
    def stop_pwn(self):
        self.led_red.stop(0) 
        self.led_green.stop(0)
        self.led_blue.stop(0)
   




