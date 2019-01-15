$(document).ready(function(){
    $('#remove').on('click', function(e){
        console.log($(e.target).attr('data-id'))
        
        $.ajax({
            type: 'DELETE',
            url: '/browse/delete/' + $(this).attr('data-id'),
            success: function(response){
                window.location.href= '/browse';
            },
            error: function(err){
                console.log(err)
            }
        })
    })
})
