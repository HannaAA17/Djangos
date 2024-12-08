from rest_framework.throttling import UserRateThrottle

class TenPerMinuteThrottle(UserRateThrottle):
    scope = 'ten_per_minute'
