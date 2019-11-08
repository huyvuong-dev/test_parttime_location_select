require(
    [
        'jquery',
        'mage/url'
    ],
    function ($,url) {
        $(document).ready(function () {
            $("#city").on('change', function () {
                window.arrDistrictByCity = {};
                window.arrWardByDistrict = {};
                var value = $(this).val();
                //alert(value);
                $.ajax({
                    type: 'POST',
                    url: url.build('locate/ajax/district'),
                    showLoader: true,
                    data: {id: value},
                    success: function (res) {
                        //console.log('success');
                    },
                    error: function () {
                        //console.log("error");
                    }
                }).done(function (data) {
                    var posts = data.resultArray;
                    var i;

                    var select_city = document.getElementById('city');
                    var default_city = document.getElementById('default_city');
                    if (default_city !== null) {
                        select_city.remove(default_city);
                    }

                    var select_district = document.getElementById('district');
                    //Allow to choose district option
                    select_district.classList.remove('class_district');
                    //Remove all option of previous selected - District
                    select_district.options.length = 0;
                    var option_defaut = document.createElement("option");
                    option_defaut.text = "Vui lòng chọn quận/huyện";
                    select_district.add(option_defaut);

                    var select_ward = document.getElementById('ward');
                    //Not Allow to choose ward option
                    select_ward.classList.add('class_ward');
                    //Remove all option of previous selected - Ward
                    select_ward.options.length = 0;
                    var option_defaut = document.createElement("option");
                    option_defaut.text = "Vui lòng chọn phường/xã";
                    select_ward.add(option_defaut);

                    //Show district option list
                    for (i = 0; i < posts.length; i++) {
                        var option = document.createElement("option");
                        option.value = posts[i]['ID'];
                        option.text = posts[i]['Title'];
                        select_district.add(option);
                        //To show option value when reload page
                        window.arrDistrictByCity[posts[i]['ID']] = posts[i]['Title'];
                    }
                });
            });

            $("#district").on('change', function () {
                //After reloading page: save as district list when edit form arcording to ID city
                var valuecity = $('#city').val();

                var value = $(this).val();
                //alert(valuecity);
                window.arrDistrictByCity = {};
                window.arrWardByDistrict = {};
                $.ajax({
                    type: 'POST',
                    url: url.build('locate/ajax/ward'),
                    data: {id: value, idCity: valuecity},
                    showLoader: true,
                    success: function (res) {
                        console.log('success');
                    },
                    error: function () {
                        console.log("error");
                    }
                }).done(function (data) {
                    var posts = data.resultArray;
                    var postsCity = data.resultArrayCity;
                    var i;
                    var select_district = document.getElementById('district');
                    var default_district = document.getElementById('default_district');
                    select_district.remove(default_district);

                    var select_ward = document.getElementById('ward');
                    //Allow to choose ward option
                    select_ward.classList.remove('class_ward');
                    //Remove all option of previous selected
                    select_ward.options.length = 0;

                    var option_defaut = document.createElement("option");
                    option_defaut.text = "Vui lòng chọn phường/xã";
                    select_ward.add(option_defaut);

                    //Show ward option list
                    for (i = 0; i < posts.length; i++) {
                        var option = document.createElement("option");
                        option.value = posts[i]['ID'];
                        option.text = posts[i]['Title'];
                        select_ward.add(option);
                        //To show option value when reload page
                        window.arrWardByDistrict[posts[i]['ID']] = posts[i]['Title'];
                    }

                    //Save district list when edit
                    for (var j = 0; j < postsCity.length; j++) {
                        window.arrDistrictByCity[postsCity[j]['ID']] = postsCity[j]['Title'];
                    }
                });
            });

            $('#ward').on('change', function () {
                //After reloading page: save as district list and ward list when edit form arcording to ID city, ID district
                var valueCity = $('#city').val();

                var valueDistrict = $('#district').val();
                //alert(valuecity);
                window.arrDistrictByCity = {};
                window.arrWardByDistrict = {};
                $.ajax({
                    type: 'POST',
                    url: url.build('locate/ajax/ward'),
                    data: {id: valueDistrict, idCity: valueCity},
                    showLoader: true,
                    success: function (res) {
                        console.log('success');
                    },
                    error: function () {
                        console.log("error");
                    }
                }).done(function (data) {
                    var posts = data.resultArray;
                    var postsCity = data.resultArrayCity;
                    var i;

                    //Save ward list when edit
                    for (i = 0; i < posts.length; i++) {
                        window.arrWardByDistrict[posts[i]['ID']] = posts[i]['Title'];
                    }

                    //Save district list when edit
                    for (var j = 0; j < postsCity.length; j++) {
                        window.arrDistrictByCity[postsCity[j]['ID']] = postsCity[j]['Title'];
                    }
                });
            });
        });
    }
);