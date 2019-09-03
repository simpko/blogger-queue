window.addEventListener('load', getQueue);

function getQueue() {
	axios.get('/api/blogs')
	.then((res) => {
		const queue = document.getElementById('queue');
		while (queue.firstChild) queue.removeChild(queue.firstChild);

		const blogs = res.data;

		if (blogs.length === 0) {
			const emptyReponse = document.createElement('div');
			emptyResponse.className = 'empty-response';
			emptyResponse.innerHTML = "there doesn't seem to be anything here."
			queue.appendChild(emptyResponse);
		} else {
			for (let i=1; i <= blogs.length; i++) {
				const blog = blogs[i-1];

				const container = document.createElement('div');
				container.className = 'blog-entry-container';
				
				const entry = document.createElement('div');
				entry.className = 'blog-entry';
				entry.id = 'blog-entry-' + i;

				const blogDate = document.createElement('div');
				blogDate.className = 'blog-date blog-box';
				blogDate.innerHTML = blog.month + '/' + blog.day;
				entry.appendChild(blogDate);

				const blogTitle = document.createElement('div');
				blogTitle.className = 'blog-title blog-box';
				blogTitle.innerHTML = blog.title;
				entry.appendChild(blogTitle);

				const blogAuthor = document.createElement('div');
				blogAuthor.className = 'blog-author blog-box';
				blogAuthor.innerHTML = blog.author;
				entry.appendChild(blogAuthor);

				const deleteBlog = document.createElement('div');
				deleteBlog.className = 'delete-blog-button blog-box';
				deleteBlog.innerHTML = 'delete';
				deleteBlog.addEventListener('click', () => {
					const entry = document.getElementById('blog-entry-' + i);
					const [date, title, author, button] = Array.from(entry.children).map((node) => node.innerHTML);
					const [month, day] = date.split('/');

					axios.post('/api/delete', {title: title, author: author, day: day, month: month})
					.then((res) => getQueue());
				});
				entry.appendChild(deleteBlog);
				container.appendChild(entry);
				queue.appendChild(container);
			}
		}
	})
	.catch((err) => {
		console.log(err);
	})
}

function addBlog() {
	// scrape the input
	const formArray = Array.from(document.getElementById('add-blog-form').children);
	const [date, title, author, button] = formArray.map((node) => node.value);
	const [month, day] = date.split('/').map((s) => parseInt(s));
	formArray.forEach((node) => { node.value = ''; }); // clear the form

	// loosely validate the input fields
	if ((1 <= month && month <= 12) && (1 <= day && day <= 31) && title.length >= 0 && author.length >= 0) {
		axios.post('/api/add', {title: title, author: author, month: month, day: day, year: 2019})
		.then((res) => getQueue());
	}
}