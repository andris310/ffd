$(function() {
  $('.delete-furn').on('click', function(e) {
    e.preventDefault();
    var link = $(this);
    var id = link.attr('fid');
    $.ajax({
      type: 'DELETE',
      url: '/destroy-furniture/' + id,
      data: {
        furniture_id: id
      },
      success: function() {
        link.parent().fadeOut(300);
      }
    });
  });

  $('.delete-designer').on('click', function(e) {
    e.preventDefault();
    var link = $(this);
    var id = link.attr('did');
    $.ajax({
      type: 'DELETE',
      url: '/destroy-designer/' + id,
      data: {
        designer_id: id
      },
      success: function() {
        link.parent().fadeOut(300);
        console.log('deleted');
      }
    });
  });
});