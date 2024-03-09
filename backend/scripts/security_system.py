import RPi.GPIO as GPIO
from time import sleep
from .date_and_time import get_date, get_time
from .alarm import alarm
from .timer import RepeatedTimer
from .led import led_on, led_off


GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
PIR_PIN = 24
GPIO.setup(PIR_PIN, GPIO.IN)


class SecuritySystem(object):
    def __init__(self, interval, duration):
        self.is_running = False
        self.timer = None
        self.interval = interval
        self.duration = duration
        self.is_alarm_on = False
     
    def detect_motion(self, duration, is_alarm_allowed):
        if (self.is_running and (GPIO.input(PIR_PIN) and (not self.is_alarm_on))):
            self.is_alarm_on = True
            print(get_date(),get_time(),' Motion Detected')
            # everything must be done before calling the alarm function
            if (is_alarm_allowed):
                alarm(duration)
            sleep(duration)
            self.is_alarm_on = False

    def _run(self):
        self.is_running = False
        self.start_system()

    def start_system(self, is_alarm_allowed):
        if not self.is_running:
            self.timer = RepeatedTimer(self.interval, self.detect_motion, self.duration, is_alarm_allowed)
            self.timer.start()
            self.is_running = True
            led_on()

    def stop_system(self):
        self.timer.stop()
        self.is_running = False
        led_off()
        
     
     
        

 



