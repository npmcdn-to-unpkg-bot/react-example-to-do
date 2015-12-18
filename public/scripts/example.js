var root       = document.getElementById('js-react-root');
var Router     = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var IndexLink  = ReactRouter.IndexLink;
var Route  	   = ReactRouter.Route;
var Link   	   = ReactRouter.Link ;
var Render 	   = React.render;

var ListItem = React.createClass({
	render : function(){
		return <li key={this.props.key} >{this.props.content}</li>
	}
});

var ListOfAnchors = React.createClass({
	handleClick : function(data){
		console.log('So power much full '+data);
	},
	render : function(){
		var self = this;
		return (

		<div className=" header container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
            	{
					self.props.anchors.map(function(data, index){
						return(
						<li><Link to={data.link} key={index} onClick={self.handleClick.bind(null, index)} > {data.name} </ Link></li>)
					})
				}
            </ul>
          </div>
        </div>
		);
	}
});

var Nav = React.createClass({
	// State.
	getInitialState : function(){
		return {
			navPills : 	[
							{
								link : '/home',
								name : 'Home'
							},
							{
								link : '/toDo',
								name : 'To Do'
							}
						]
		};
	},
	// Render function.
	render : function(){
		return (
			<nav>
				<ul>
					<ListOfAnchors  anchors={this.state.navPills} />
				</ul>
			</nav>
		)
	}
});

var Content = React.createClass({
	// Render function.
	render : function(){
		return (
			<section>
			   <h1>{this.props.message}</h1>
			</section>
		)
	}
});

var Main = React.createClass({
	getInitialState : function(){
		return {
			salute : 'Component, I am your father.'
		}
	},
	render : function(){
		return (
			<section>
				<Nav />
				<Content message={this.state.salute} />
		        {this.props.children}
			</section>
		);
	}
});

var Home = React.createClass({
	render : function(){
		return (
			<section>
				<h1>Home</h1>
			</section>
		);
	}
});

var root  = document.getElementById('js-react-root');

var ToDO = React.createClass({
	// Functions.
	getText : function(){
		return this.state.text
	},
	// State.
	getInitialState : function(){
		return {
			text : 'To Do'
		}
	},
	// Render function.
	render : function(){
		return (
			<section>
				<h2>{this.getText()}</h2>
				<TodoApp />
			</section>
		);
	}
});

var TodoListItem = React.createClass({
	render: function(){
		var component = this,
		props     = component.props;
		return (  
				<li key={props.key} >{props.data}</li>
		); 
	} 
});

var TodoForm = React.createClass({
	getInitialState: function() {
	 	return {item: ''}; 
	}, 
	handleSubmit: function(e){
		e.preventDefault(); 
		this.props.onFormSubmit(this.state.item);
		this.setState({item: ''});
		React.findDOMNode(this.refs.item).focus();
		return; 
	}, 
	onChange: function(e){
	 	this.setState({ item: e.target.value }); 
	}, 
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}> 
				<input type='text' ref='item' onChange={this.onChange} value={this.state.item}></input> 
				<input type='submit' value='Add'></input>
		 	 </form> 
		); 
	} 
});




var TodoApp = React.createClass({
	getInitialState: function(){
		return {items: ['nuevo1', 'Nuevo2']}; 
	}, 

	updateItems: function(newItem){
		var allItems = this.state.items.concat([newItem]); 
		this.setState({items: allItems}); 
	},

	renderTodo: function(){
		var self = this;
		return self.state.items.map(function(data, index){
			return(
				<div>
					<TodoListItem data={data} key={index} />
				</div>
			)
		})
	},

	render: function(){
		return (
		 	 <section> 
		 	 	<TodoForm onFormSubmit={this.updateItems}/>
				<ul>
					{ this.renderTodo() }
				</ul>

		 	 </section> ); 
	} 
});


ReactDOM.render(<ToDO />, root);

Render((
  <Router>
    <Route path="/" component={Main}>
    	<Route path='home'component={Home} />
    	<Route path='toDo'component={ToDO} />
    </Route>
  </Router>
), root)