from django.shortcuts import render,redirect
from django.contrib import messages,auth
from django.contrib.auth.models import User
from .models import Result
from django.contrib.auth.decorators import login_required
# Create your views here.

def login(request):

    if request.method=='POST':
        field=request.POST['field']
        password=request.POST['password']
        user = auth.authenticate(username=field, password=password)
        if user is not None:
            auth.login(request,user)
            
            return redirect('Solve_sudoku:display')
        try:
            objectfound = User.objects.get(email=field.lower())
        except:
            messages.error(request,'Invalid Login Credentials !')
            return redirect('Solve_sudoku:login')

        username = objectfound.username
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request,user)
            
            return redirect('Solve_sudoku:display')
        else:
            messages.error(request,'Invalid Login Credentials !')
            return redirect('Solve_sudoku:login')
    else:
        return render(request,'Solve_sudoku/login.html')

    

def register(request):
    if request.method=='POST':
        firstname=request.POST['firstname']
        lastname=request.POST['lastname']
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        confirm_password=request.POST['confirm_password']
        if password==confirm_password:
            
            if User.objects.filter(email=email).exists():
                messages.error(request,'OOPS! entered email already exists, Try another one.')
                return redirect('Solve_sudoku:register')
            elif User.objects.filter(username=username).exists():
                messages.error(request,'OOPS! entered user name already exists, Try another one.')
                return redirect('Solve_sudoku:register')

            else:
                user = User.objects.create_user(first_name=firstname,last_name=lastname,username=username,email=email,password=password)
                user.save()
                auth.login(request,user,backend='django.contrib.auth.backends.ModelBackend')
                
                return redirect('Solve_sudoku:display')
        else:
            messages.error(request,'password and confirm password fields do not match !')
            return redirect('Solve_sudoku:register')
    else:
        return render(request,'Solve_sudoku/register.html')

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        messages.success(request,'You are successfully logged out !')
    return redirect('Solve_sudoku:login')


@login_required(login_url = 'Solve_sudoku:login')
def display(request):
    if request.method=='POST':

        if request.user.is_authenticated:
            first_name = request.POST['first_name']
            last_name = request.POST['last_name']
            email_id = request.POST['email']
            status = request.POST['result']
            time = request.POST['time']
            print([first_name,last_name,email_id,status,time])
            info = Result.objects.create(first_name=first_name,last_name=last_name,email_id=email_id,status=status,time=time)
            info.save()
            messages.success(request,'Your submission is successfully saved in our database !')
            return redirect("Solve_sudoku:logout")
        else:
            messages.error(request,'you must be logged in before playing sudoku!')
            return redirect("Solve_sudoku:login")

    return render(request,'Solve_sudoku/sudokuboard.html')