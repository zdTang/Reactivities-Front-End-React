# 5-6 Ceatea a dashboard 

Sementic Grid

https://react.semantic-ui.com/collections/grid/#content-columns

# 5-7 create activity list
segments
https://react.semantic-ui.com/elements/segment/#types-segment
as="a" mean it is a tag.
this pattern is good for format a Card, keep in mind and use it.

# 5-8 - Creating a details view
1. how to set Grid to divide the page into tow columns
2. use Semantic Card View. follow its patten and insert relevant Value  
https://react.semantic-ui.com/views/card/#types-card

# 5-9 - Creating an Activity form

1. use "fluid" to match Parent container's width
2. use "clearing" to clean previous float content.
3. use placeHolder to display Info

# 5-10 wire up component and event handler 

 onClick={()=>selectedActivity(activity.id)} /> why need this format?
 
 # 5-11 display the create and edit form
 
1. "editMode" state is used to toggle displaying ActivityForm and ActivityDetail   
2. "ActivityForm" will be triggered by "Create" on Navbar and "Edit" on ActivityDetail  
3. The Visibility of a Component is decided by "State", if state is ture, then that Component will be rendered.
4. Two locations will call "HandleFormOpen" method.  
  when use "Create Activity" on Navbar, no id passed here, will trigger "handleCancelActivity"  
  when use "View"=>"Edit" to trigger this method, will have id , will execute "handleSelectActivity"
  
The display of ActivityForm decided by two state flow:
App=>NavBar=>control ActivityForm
App=>ActivityDashboard=>control (ActivityDetails + ActivityForm)

# 5-12 - Editing an activity and form basics in React

1, notice how to bind a object with Form, this is a classic approach.
2, use Alias is very confusing. the syntax is similar as declare Type.

# 6-2 - Setting up axios

1, study the agent.ts file, it is good pattern.
2, review promise pattern.

# 6-3 - Axios types
date type.  
The date string fetched from Asp.net core is very long. use String.split to get the part we need.

# 6-4 - Adding loading indicators
Dimmer and Loader
Need take time to practice Semantic-React-ui  
https://react.semantic-ui.com/elements/loader/#types-loader

Axios.interceptor
https://axios-http.com/docs/interceptors

Promise.reject vs Throw
https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw

Need dive Promise deeper to understand code.

# 6-5 - Posting data to the server

the loading effect on the button

https://react.semantic-ui.com/elements/button/

About using Axios api to operate Back end. The approach we are using is operating API. and don't reload the new database.   Instead, we operate the State as well, to make is samiliar with the copy in the database. 


# MobX store
what is store in Mobx  
https://mobx.js.org/defining-data-stores.html  
Store vs context.  
create a context need a store.  
have no idea if we can use Mobx state without help of useContext  
useContext is only for conveying state other than processing state
Mobx is processing state.


Make clear the relationship between createContext, provider,store

context=createContext(store)  

How to apply:  
<context.provider value={store}>  
content...   
<context.provider>

the store can mantain action as well
update state with action must use "observer", observer(App), or it cannot be display.


# 7-4 MobX actions

import "makeAutoObservable" to make exporting state easy.  
https://mobx.js.org/api.html

# 7-5 Refactoring the app to use MobX - no Async

move those state from App.tsx to ActivityStore.  
in ActivityStore, states are managed by useState, now, it's time to manage them centrally.

For current Promise, it works well.

# 7-5 Refactoring the app to use MobX - Async  

To call an async function without using "await"?   

https://stackoverflow.com/questions/55019537/is-possible-to-call-async-function-without-await-keyword-and-what-happens-if-we

# 7-6 - MobX strict mode
https://mobx.js.org/actions.html

if we update states with action, no problem.
if no action(Method), we need Wrap with runInAction( ).

# Move states from components to STORE

We can use MobX store to manage state centually. but for those handler, will banlance if it is necessary to move to store   
For those methods(Handler) which will effect global states, we can move it to MobX store. because those global states are there too.   
For those methods(Handler) which will only effect local state within limited scope. we can just maintain locally.

#  Fix warnings
1. use runInAction to wrap those assignments to fix warnings
2. Switch to "Async-await" syntax
3. Fix a name bug. "selectActivity"=>"selectedActitity"
4. Now the program runs properly.


# 7-9 

Use my approach to finish those steps. 
add TRY-CATCH for those async operations.

# 7-10 - Using a Javascript map object to store the activities

use Map other than Array.  
what is the benefit of using Map?


# 8-3 - Adding routes

move useEffect to Dashboard.  
At this point, the App component has only NavBar ui.

# 8-4 - Activity Form

Here must make clear.
Before, Because ActivityForm is the Child of ActivityDashboard, it is triggered by a state called "editMode", so that if ActivityDashboard is not mounted, ActivityForm will not diplay.

if in the URL, we input "localhost:3000/", at this moment, the ActivityDashboard is not mounted actually. so that even the buttenhandler change the "editMode" to "on", but ActivityDashboard is not mounted, so it is useless for triggering the ActivityForm...

Now, with the help of Router, we can call the componet individually. without must call its Parent component.

"NavLink"s  format "as={NavLink} to='/activities' " 

# 8-6 - Getting an individual activity

Before ,the ActivityDetail view in Child of ActivityDashboard. we use State to decide if display it or hide it.  
We pass parameter with "Props" or state such as "selectedID" from store.


But now we are using Route with parameter.

Now, we use Router to pick it out and display  

How to specify a parameter.  
Once we launch a Router with a parameter  
1, Display the Component we specified.  
2, In the Component, we can use useParams to get the ID or something passed in.  
3. Need a brand-new logic to retrive the contant we need to display.   

To load the specify Activity. we first check the Memory, if we cannot find it  we should fetch it from remote database.  

# 8-8 

Both "createActivity" and "Edit" on the "ActivityDetail" can trigger the ActivityForm

Click "edit" on the ActivityDetail,  the ActivityForm will display too.
Add two path to  point to one component.   

For the ActivityForm, before using router, it can get state from Props of parent component( ActivityDashboard), now it can get a ID from the URL. once the component is triggered by Router, the component should use the ID in the URL to grab the content and display it.

# 8-9 

Scenario.   when we click the "view" button of certain Activity on the "ActivityList", a ActionForm will display, and display the value of the Activity.  At this moment, if we click the "createActivity" on the naveBar, we wish the Form will be reset, that is to say, we wish those old value can be cleared. 

Why the URL changed, the Form View is not been re-rendered ?  the reason lies the useEffect relays on an dependency called "id", when click "createActivity", at this moment, the "id" is undefined.   

Based on instructor, and React-router's documentation. to force the element to be re-rendered. we need give it an extra key.  because this key is always there in the Location Object, it will change with the URL. so that once the URL is change, the key will change and the componet will be re-rendered.  






