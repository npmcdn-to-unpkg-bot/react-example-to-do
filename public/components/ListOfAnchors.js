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