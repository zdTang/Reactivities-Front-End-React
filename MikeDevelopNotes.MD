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