$(document).ready(function(){
	// console.log("hello"); 


	const apiKey = 'fec8b5ab27b292a68294261bb21b04a5';


	// all api calls go this link
	const apiBaseUrl = 'http://api.themoviedb.org/3';
	//all images use this link
	const imageBaseUrl = 'http://image.tmdb.org/t/p/';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' +apiKey
	// console.log(nowPlayingUrl);

	$.getJSON(nowPlayingUrl, (nowPlayingData)=>{
		// console.log(nowPlayingData)	
		var nowPlayingHTML = getHTML(nowPlayingData);	
		$('#movie-grid').html(nowPlayingHTML); 
		$('.movie-poster').click(function(){
				//change the HTML inside the modal 
			var thisMovieId = $(this).attr('movie-id');
			var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey};`
			$.getJSON(thisMovieUrl, (thisMovieData)=>{
				console.log(thisMovieData);
				$('#myModalLabel').html(thisMovieData.title);
				//open the modal
				$('#myModal').modal; 

			});
			//change the HTML inside the modal
			//change the modal 

			


		});


	}); 

	$('#movie-form').submit((event)=>{
			//stop browser from submitting it. JS handle submission
			event.preventDefault();
			//inputs have vals 
			var userInput = $('#search-input').val();
			var safeUserInput = encodeURI(userInput);
			var searchUrl = apiBaseUrl + '/search/movie?query=' + safeUserInput + '&api_key=' + apiKey; 
			// console.log(searchUrl);
			$.getJSON(searchUrl, (searchMovieData)=>{
				var searchMovieHTML = getHTML(searchMovieData);
				$('#movie-grid').html(searchMovieHTML);



			});
	});


	function getHTML(data){
		var newHTML = '';
		for (let i = 0; i < data.results.length; i++){
				//contains imageBaseUrl, the width of the image, add 
				var posterUrl = imageBaseUrl + 'w300' + data.results[i].poster_path; 
				newHTML += '<div class ="col-sm-6 col-md-3 movie-poster" movie-id = '+ data.results[i].id+ '>';
					newHTML += `<img src ="${posterUrl}">`;
				newHTML += `</div>`;	
		} 
		return newHTML

	}

}); 

