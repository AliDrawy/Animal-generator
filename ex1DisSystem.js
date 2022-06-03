// function date(){
//     let today= new date();
//     let month=today.getMonth()
// }
let animelData = [];
let datee = [];
$(document).ready(function () {

    $.ajax({
        url: "http://alidr.mysoft.jce.ac.il/get_current_date.php",
        success: function (res) {
            datee = res;
            $(".date").html(res);
        }
    });

    $('.b1').click(function () {
        $.ajax('https://zoo-animal-api.herokuapp.com/animals/rand/4',
            {
                dataType: 'json',
                timeout: 5000,

                success: function (res) {
                    animelData=res;
                    newA(res, 4);

                },
                error: function (res) {
                    console.log(res);
                }

            })
    })
    $('.b2').click(function () {
        $.ajax('https://zoo-animal-api.herokuapp.com/animals/rand/8',
            {
                dataType: 'json',
                timeout: 5000,

                success: function (res) {
                    animelData=res;
                    newA(res, 8);

                },
                error: function (res) {
                    console.log(res);
                }

            })
    })
    $('.b3').click(function () {
        $.ajax('https://zoo-animal-api.herokuapp.com/animals/rand/10',
            {
                dataType: 'json',
                timeout: 5000,

                success: function (res) {
                    animelData=res;
                    newA(res, 10);

                },
                error: function (res) {
                    console.log(res);
                }

            })
    })

    $('body').on('click', '.clickon1', function (cli) {
        let str=".information"+cli.target.id;
        if($(str).css('display')==='block'){
            $(str).css('display','none');
        }
        else{
            whinCliclOn(cli);
            $(str).css('display','block');
        }
    });
    $('body').on('click', '.clickon2', function (cli) {
        let str=".information"+cli.target.id;
        if($(str).css('display')==='block'){
            $(str).css('display','none');
        }
        else{
            whinCliclOn(cli);
            $(str).css('display','block');
        }
    });
});
function newA(res, num) {
    let all = "";
    for (let i = 0; i < num; i++) {
        let name = '<p id=' + i + ' class="clickon1">' + res[i].name + '</p>';
        let image = '<img id=' + i + ' src=' + res[i].image_link + ' class="clickon2">';
        let save='<p>' +"family: "+res[i].animal_type+ '</p>' +'<p>' +"food: "+res[i].diet+ '.</p>'+'<p>' +"average life: "+res[i].lifespan+'</p>'+'<p>' +"minimum length: " +(parseFloat(res[i].length_min)*0.3048).toFixed(3)+'</p>'
        +'<p>' +"maximum length: " +(parseFloat(res[i].length_max)*0.3048).toFixed(3)+ '</p>' +'<p>'+"minimum weight: " + (parseFloat(res[i].weight_min)*0.45359237).toFixed(3)+'<p>'+"maximum weight: " + (parseFloat (res[i].weight_max)*0.45359237).toFixed(3)+'.</p>'+'<div class="View'+i+'"> </div>';
        all += '<div' + 'class="nameAndImage">' + name + image + '<div class="information' + i + '">' +save+ '</div>' + '</div>';
    }
    $('.animel').html(all);

}
function whinCliclOn(cli) {
    let date_7=afterweak(true);
    let date_0=afterweak(false);
    
    let url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/' + animelData[cli.target.id].name + '/daily/' + date_7 + '/' + date_0;
        $.ajax(url,
            {
                dataType: 'json',
                timeout: 5000,
                success: function (data) {
                    let sum=0;
                    for(let i=0;i<data["items"].length;i++) sum+=data["items"][i].views;
                    $(`.View${cli.target.id}`).html(`Views: ${sum}`);
                },
                error: function () {
                    $(`.View${cli.target.id}`).html("Views: NA");
                }
            });
    }
function afterweak(boolean) {
    
    let date_i = datee.split('/');
    date_i = new Date(date_i[1] + '/' + date_i[0] + '/' + date_i[2]);
    if(boolean==true)
        date_i.setDate(date_i.getDate() - 7);
    let String = date_i.getFullYear().toString();
    let month = (date_i.getMonth() + 1).toString();
    if (month.length !== 2) {
        String += '0';
    }
    String += month;
if (date_i.getDate().toString().length !== 2) {
    String += '0';
}
String += date_i.getDate().toString();
return String;
}


