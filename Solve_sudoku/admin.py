from django.contrib import admin
from .models import Result
# Register your models here.

class ResultAdmin(admin.ModelAdmin):
    list_display= ('id','first_name','email_id','status','time')
    list_display_links = ('id','first_name')
    search_fields = ('first_name','last_name','email_id')
    list_filter = ('status','email_id')


admin.site.register(Result,ResultAdmin)


