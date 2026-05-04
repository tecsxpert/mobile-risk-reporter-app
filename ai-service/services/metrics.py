import time

start_time = time.time()
request_count = 0
total_time = 0


def record_request(duration):
    global request_count, total_time
    request_count += 1
    total_time += duration


def get_metrics():
    uptime = time.time() - start_time
    avg_time = (total_time / request_count) if request_count else 0

    return {
        "uptime": round(uptime, 2),
        "avg_response_time": round(avg_time, 3)
    }