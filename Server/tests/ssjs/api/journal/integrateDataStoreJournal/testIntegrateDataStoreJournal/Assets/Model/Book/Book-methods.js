

model.Book.methods.createBooks = function(o) {
	// Add your code here;
	var count = 10;
	var titlePattern = 'MyBook';
	if(o.hasOwnProperty('count')){
		count = o.count;
	}
	if(o.hasOwnProperty('title')){
		titlePattern = o.title;
	}
	for (var i =0;i < count;i++){
		var e = new ds.Book({title: titlePattern+" "+(i+1)});
		e.save();
	}
};

model.Book.methods.createBooks.scope = 'public';
