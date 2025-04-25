from flask import Flask, render_template, url_for, request, redirect
from classes.business import Business
from datetime import datetime


business = Business()
app = Flask(__name__)


@app.route('/')
def home():

    return render_template('/pages/landing.html')

@app.route('/dashboard')
def dashboard():
    businessList = business.getBusinessesList()
    
    return render_template('/pages/dashboard.html', businessList = businessList['data'], datetime = datetime )


@app.route('/about')
def about():
    return render_template('/pages/about.html')





@app.route('/add-business', methods=['GET', 'POST'])
def addBusiness():
    if(request.method == 'POST'):
        try:    
            # BUSINESS DETAILS FROM HTML FORM
            business_details = (
                int(datetime.now().timestamp() * 1000) % 1000000000,
                datetime.now().timestamp(),
                request.form['name'],
                request.form['type'],
                request.form['owner'],
                request.form['front-id'],
                request.form['back-id'],
                request.form['website'],
                datetime.now().timestamp() + 31536000  # 1 year in seconds
            )
            # INSERT NEW BUSINESS DETAILS
            business.insertBusiness(business_details)
            

            # REDIRECT TO SUCCESS PAGE
            return redirect(url_for('registered', id = business_details[0]))
        
        except Exception as e:
            return redirect(url_for('failed', err = e))
    else:
        return "Invalid request method"
    


@app.route('/failed/<err>')
def failed(err):
    return render_template('/pages/add-failed.html', err = err)


@app.route('/registered/<id>')
def registered(id):
    # BUSINESS DETAILS 
    business_details = business.getBusinessById(id)

    if business_details["err"]: 
        return "Something went wrong!"
    else:
        return render_template('/pages/add-success.html', businessDetails = business_details['data'][0], datetime=datetime)
        

@app.route('/get-id/<id>')
def getId(id):
    return business.getBusinessById(id)



@app.route('/delete/<id>')
def remove(id):
    response = business.remove(id)
    return redirect(url_for('dashboard', response = response['data']))
    



if(__name__ == "__main__"):
    app.run(debug=True)