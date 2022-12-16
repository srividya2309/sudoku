from django.urls import path
from . import views

app_name = 'Solve_sudoku'

urlpatterns = [
    path('',views.register,name='register'),
    path('login/',views.login,name='login'),
    path('sudoku/',views.display,name='display'),
    path('logout/',views.logout,name='logout'),
]

