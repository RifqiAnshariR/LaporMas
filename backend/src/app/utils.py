from datetime import datetime, timedelta, timezone


def get_jakarta_dt() -> datetime:
    jakarta_tz = timezone(timedelta(hours=7))
    jakarta_dt_now = datetime.now(jakarta_tz)

    return jakarta_dt_now.replace(microsecond=0, tzinfo=None)
