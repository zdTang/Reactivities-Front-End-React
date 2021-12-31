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