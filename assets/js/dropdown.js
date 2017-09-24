var $list   = $(this),
    $select = $('<select />');

$list.children('li').each(function(index) {
    $select.append($('<option />').attr('value', index).html($(this).html()));
});

$list.replaceWith($select);


var $list   = $(this),
    index   = $('.dropdown, select[id^="converted_dropdown_"]').index( this ),
    $select = $('<select />').attr('id', 'converted_dropdown_' + (index + 1));