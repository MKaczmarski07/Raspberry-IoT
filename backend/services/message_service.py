import smtplib
from email.message import EmailMessage
from .config import message_service as cfg

def email_alert(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = to
    
    user = cfg["username"]
    msg['from'] = user
    password = cfg["password"]
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)
    
    server.quit()
    