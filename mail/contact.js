$(function () {
    const $form = $("#contactForm");
    const $submitButton = $("#sendMessageButton");
    const $successAlert = $('#success');
    
    // Form validation
    $form.find("input, textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Handle validation errors
            $successAlert.html("<div class='alert alert-warning'>");
            $successAlert.find('.alert-warning')
                .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                .append("<strong>Please correct the following errors:</strong>")
                .append("<ul>");
            
            errors.forEach(error => {
                $successAlert.find('.alert-warning ul')
                    .append(`<li>${error}</li>`);
            });
            
            $successAlert.find('.alert-warning').append('</ul></div>');
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            
            $submitButton.prop("disabled", true)
                .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');

            // Submit the form
            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json',
                success: function() {
                    $successAlert.html("<div class='alert alert-success'>");
                    $successAlert.find('.alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>Message sent successfully!</strong>")
                        .append("<p>Thank you for reaching out. I'll get back to you soon.</p>");
                    
                    $form.trigger("reset");
                },
                error: function() {
                    $successAlert.html("<div class='alert alert-danger'>");
                    $successAlert.find('.alert-danger')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>Sorry, there was an error sending your message.</strong>")
                        .append("<p>Please try again later or contact me directly at jaimes.a@northeastern.edu</p>");
                },
                complete: function() {
                    setTimeout(function() {
                        $submitButton.prop("disabled", false)
                            .html('Send Message');
                    }, 1000);
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    // Clear alerts when focusing on form fields
    $form.find("input, textarea").focus(function() {
        $successAlert.html('');
    });

    // Handle tab navigation
    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
