$(document).ready(function(){
	$('.delete-material').on('click', function(){
		var id = $(this).data('id');
		var url = '/materials/'+id;
		if(confirm('Delete material?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					console.log('Deleting material...');
					window.location.href='/materials';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
    });
    
    $('.delete-job').on('click', function(){
		var id = $(this).data('id');
		var url = '/job-order/'+id;
		if(confirm('Delete Job Order?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					console.log('Deleting job order...');
					window.location.href='/job-order/view';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
    });
    $('.delete-user').on('click', function(){
		var id = $(this).data('id');
		var url = '/users/'+id;
		if(confirm('Delete User?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					window.location.href='/users/view';
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
	$('.delete-wsaip').on('click', function(){
		var id = $(this).data('id');
		var url = '/wsaip/data/'+id;
		if(confirm('Delete response?')){
			$.ajax({
				url: url,
				type:'DELETE',
				success: function(result){
					window.location.href='/wsaip/data';
					
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	});
});