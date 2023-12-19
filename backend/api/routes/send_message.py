import datetime

from api import *
from database.database import Db


send_message_blueprint = Blueprint("send_message", __name__)


@send_message_blueprint.route("/api/send_message", methods=["POST"])
def create_application():
    """
    Создать сообщение

    Параметры:
        {
            text: string 
            sender_id: int -
            application_id: int - 
        }

    Возвращаемое значение:
        {
            ok: boolean - айди заявки
        }
    """

    try:
        text = request.json["text"]
        sender_id = request.json["sender_id"]
        application_id = request.json["application_id"]

        db = Db()
        db.add_message(text, sender_id, application_id)
        print(request.json)
        return jsonify({"ok": True})
    
    except KeyError as e:
        print(e)
        return jsonify({"error": f"key {e} not found"})
    