require([
    'jquery',
    'jquery/jquery.cookie'
], function ($) {
    $(document).ready(function () {
        window.arrDistrictByCity = {};
        window.arrWardByDistrict = {};
        var shipping_address = document.getElementById('location');
        if (shipping_address) {
            if ($.cookie('ward') != null && $.cookie('district') != null && $.cookie('city') != null) {
                shipping_address.text = $.cookie('ward') + ', ' + $.cookie('district') + ', ' + $.cookie('city');
            } else {
                shipping_address.text = "Location Select";
            }

            //Fill in option select when reload page
            if ($.cookie('wardId') != null && $.cookie('districtId') != null && $.cookie('cityId') != null) {
                var select_city = document.getElementById('city');
                var default_city = document.getElementById('default_city');
                if (default_city !== null) {
                    select_city.remove(default_city);
                }

                //Show value option District
                var select_district = document.getElementById('district');
                var default_district = document.getElementById('default_district');
                if (default_district !== null) {
                    select_district.remove(default_district);
                }
                if ($.cookie('arrDistrict') != null) {
                    var json_str = $.cookie('arrDistrict');
                    var arrDistrict = JSON.parse(json_str);

                    for (var key in arrDistrict) {
                        var option = document.createElement("option");
                        option.value = key;
                        option.text = arrDistrict[key];
                        select_district.add(option);
                    }
                    select_district.classList.remove('class_district');
                }

                //Show value option Ward
                var select_ward = document.getElementById('ward');
                var default_ward = document.getElementById('default_ward');
                if (default_ward !== null) {
                    select_ward.remove(default_ward);
                }
                if ($.cookie('arrWard') != null) {
                    var json_ward = $.cookie('arrWard');
                    var arrWard = JSON.parse(json_ward);

                    for (var key in arrWard) {
                        var option = document.createElement("option");
                        option.value = key;
                        option.text = arrWard[key];
                        select_ward.add(option);
                    }
                    select_ward.classList.remove('class_ward');
                }
                //set option selected by id
                document.getElementById('city').value = $.cookie('cityId');
                document.getElementById('district').value = $.cookie('districtId');
                document.getElementById('ward').value = $.cookie('wardId');
            }
        }

    })
});