// https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events
const rootLink = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT`

// web api call
// httpVerb  url
// POST =>   Create data
// GET =>    Read
// PUT =>    Update data
// DELETE => Delete data

// standard restful apu routes 
// event (Model) => {id:unique name:string  location: number, date:Datetime, description:string}



// get    /events        =>   get all tweets multiple [events...]
// With any of these
// When page loads show events
// - fetch data from server (via our api)
    // - loading UI
    // - Error Handling
// - add this data to state when successfull
// - render state - connect my state to my UI  ✔ 
// - UI ONLY html css (no js) how do I want this list to look ✔ 

const initialState = {
    events: []
}

const state = initialState

// 
const fetchEvents = async () => {
   console.log('fetching events')

   // API
   // fetch by default does get
   // get =>  `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT`
   let res = await fetch(`${rootLink}/events`)
   // axios -> for me does a step to concert the response
   let data = await res.json();
   console.log('API Response:', data);
   let events = data.data
   console.log('events:', events)// what am I expecting here

   // everytime I change state render
   state.events = events
   renderEvents()
   //
}
// delete => /events/:id
const handleClicked = async (id)=>{
    try {
    
        let res = await fetch(`${rootLink}/events/${id}`, {
            method: 'DELETE',
        });
        // BETTER UX
        // remove from state the event was removed...
        // rerender
        const newEventswithDeletedEventREmoved = state.events.filter( event => event.id !== id)

        state.events = newEventswithDeletedEventREmoved
        renderEvents()
        
        // why refetch the events?
        // await fetchEvents();
    } catch (error) {
        console.error('Error:', error);
    }
}

const renderEvents = () => {
    console.log('render events')
    let eventHTMLString = ''; // Use let instead of const to allow reassignment
    let eventsHTML = document.getElementById('events')
    state.events.forEach(event => {
        eventHTMLString += `
            <div class="event">
                <h1>${event.name}</h1>
                <p>${event.description}</p>
                <p>${event.date}</p>
                <p>${event.location}</p>
                <p>id: ${event.id}</p>
                <button onclick="handleClicked(${event.id})" >delete</button>
            </div>
        `;
    });
    eventsHTML.innerHTML =  eventHTMLString//not working
};


// get    /events/:id    => get one events {events}
// delete /events/:id    =>  delete events {events}
// post   /events  + {?}     => create a tweet
// put    /events/:id +  {?} = updates tweet


const render = () =>{
  renderEvents()
}

const init = ()=>{
    fetchEvents()
}

init()