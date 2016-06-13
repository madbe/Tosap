$(document).ready(function(){
    
    var uploadForm =$('#uploadForm'); 
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    var progress = $("progress");
       
    $(uploadForm).ajaxForm({
        beforeSend: function() {
            status.empty();
            var percentVal = '0%';
            // bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete;
            progress.val(percentVal);
            // bar.width(percentVal + '%')
            percent.html(percentVal + '%');
            status.empty().text("File is uploading...");
            console.log(percentVal, position, total);
        },
        success: function() {
            var percentVal = '100';
            progress.val(percentVal);

            // bar.width(percentVal + '%')
            percent.html(percentVal + '%');
        },
        complete: function(xhr) {
            status.html(xhr.responseText);
        }
    });

    // var inputs = document.querySelectorAll( '.input-file' );
    // Array.prototype.forEach.call( inputs, function( input )
    // {
    //     var label    = input.nextElementSibling,
    //         labelVal = label.innerHTML;

    //     input.addEventListener( 'change', function( e )
    //     {
    //         var fileName = '';
    //         if( this.files && this.files.length > 1 )
    //             fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    //         else
    //             fileName = e.target.value.split( '\\' ).pop();

    //         if( fileName )
    //             label.querySelector( 'span' ).innerHTML = fileName;
    //         else
    //             label.innerHTML = labelVal;
    //     });
    // });
});