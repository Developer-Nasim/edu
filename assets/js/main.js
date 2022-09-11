(function($) {
  "use strict";

    // calender
    if(document.querySelector('#datepicker')){ 
        $( "#datepicker" ).datepicker({ firstDay: 1});
    }


    // Show Notifications
    $('.showNotifs').click( function (){ 
        $('.dashRight-wrps').toggleClass('show');   
    }); 
    // Show hide schedule
    $('.scVrs button.clps').click( function (e){
        e.target.parentElement.parentElement.parentElement.classList.toggle('showNow') 
    }); 

    $('.niceSelect').niceSelect();

    // Top Search suggest tags
    AutoSuggestionSearch()
    function AutoSuggestionSearch() {
            
            let allInputs = document.querySelectorAll("input[name=tags]");
            allInputs.forEach(Inp => {
                new Tagify(Inp, {
                    whitelist: [    
                        "Joeke Hog",
                        "Joep Lima",
                        "Joep Siquior",
                        "ACL2", 
                        "ACT-III",
                        "Action!", 
                        "Ada", 
                    ],
                    blacklist: ["fuck", "shit"]
                });
            }) 

        let searchBtn = document.querySelectorAll('.searchIconItIs')

        if (searchBtn.length > 0) {
            searchBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let searchBlk = e.target.parentElement;
                    searchBlk.classList.toggle('show')
                    
                })
            });
        }

    }

    // Added value on the input 
    function AddValueOFInput() { 
        // Select the target node
        if (document.querySelectorAll('.slider-time').length > 0) {
            
            var targeTime = document.querySelector('.slider-time')
            var targeTime2 = document.querySelector('.slider-time2') 

            $("body").on('DOMSubtreeModified', {targeTime,targeTime2}, function(e) {
                if (6 > e.target.innerHTML.length ) {
                    let selectInput = e.target.parentElement.querySelector('[type="hidden"]')
                    if (e.target.classList.contains('slider-time')) {
                        selectInput.value = e.target.innerHTML +" - "+ e.target.parentElement.querySelector('.slider-time2').innerHTML
                    }else if(e.target.classList.contains('slider-time2')){
                        selectInput.value = e.target.parentElement.querySelector('.slider-time').innerHTML +" - "+ e.target.innerHTML
                    }

                }
            });

        }
    }
    AddValueOFInput()
    
    // SHow has url when open tag popup
    function ShowPopupWithHashId() { 
        if (document.querySelectorAll('.showHashInUrl').length > 0) {
            let btn = document.querySelector('.showHashInUrl');
            btn.addEventListener('click', (e) => {
                let Hash = btn.dataset.hash; 
                if (!window.location.href.includes(Hash)) {
                    var newurl = window.location.href + Hash; 
                    window.history.pushState({ path: newurl }, '', newurl);
                }

                let clsBtn = document.querySelector(`${btn.dataset.bsTarget} .close-this-popup`)
                if (clsBtn) {
                    clsBtn.addEventListener('click', ()=>{
                        var newurl = window.location.href.replace(Hash,"") 
                        window.history.pushState({ path: newurl }, '', newurl);
                    })
                }

                

            })
        }
    }
    ShowPopupWithHashId()

    // tag Edit 
    EditSaveVoorkeur()
    function EditSaveVoorkeur() {
        if (document.querySelectorAll('.tgEdtBtn').length > 0) { 
            let EditBtns = document.querySelectorAll('.tgEdtBtn')
            EditBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.parentElement.classList.toggle('offMode') 
                })
            });
        }
    }

    // Bootstrap ToolTip
    function BootstrapToolTip() { 
        if (document.querySelectorAll('[data-bs-toggle="tooltip"]').length > 0) { 
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        }
    }
    BootstrapToolTip()

    //  Show hide input select in schedular page
    function Show_HideInput_Select() { 
        if (document.querySelectorAll('.showSelection_input').length > 0) { 
            let selection_input = document.querySelectorAll('.showSelection_input')
            selection_input.forEach(inp => {
                inp.addEventListener('click', () => {
                    inp.parentElement.classList.toggle('showWhatYouNeed')
                })
            })
        }
    }
    Show_HideInput_Select()



    // show success popup
    SuccessPopup()
    function SuccessPopup() {
        if ($('.showSuccess').length > 0) {
        $('.showSuccess').click((e) => {
            const targetModalBody = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            targetModalBody.classList.add('showSuccessnOW') 
        })
        }
    }

 
    // Edit schedule time table 
    function ScheduleTimeTable() {     
        function SetListNumbs() {
            if (document.querySelectorAll('.theListsOfSchedule .nmb').length > 0) {
                let inps = document.querySelectorAll('.theListsOfSchedule .nmb');
                    console.log(inps.length)
                for (let i = 0; i < inps.length; i++) { 
                    inps[i].innerHTML = i+1
                } 
            }
        }

        function TimeTableedits() {
            if (document.querySelectorAll('.timeBlk input[type="text"]').length > 0) {
                let inps = document.querySelectorAll('.timeBlk input[type="text"]');
                inps.forEach(inp => {
                    inp.addEventListener('keyup', (e) => {
                        let rgx = RegExp(/[a-z]/)
                        let theValue = e.target.value.replace(rgx,"").replace(" ","").slice(0,5)
                        e.target.value = theValue

                        let hrs  = theValue.slice(0,2)
                        let mnts = theValue.slice(3,5)
                        
                        if (hrs > 12 || mnts > 60) {
                            if (!e.target.classList.contains("timeInvalid")) {
                                e.target.classList.add("timeInvalid")
                            }
                        }else if(hrs == 12 && mnts > 0 || 0 > hrs && mnts > 0){
                            if (!e.target.classList.contains("timeInvalid")) {
                                e.target.classList.add("timeInvalid")
                            }
                        }else{
                            if (e.target.classList.contains("timeInvalid")) {
                                e.target.classList.remove("timeInvalid")
                            }
                        } 
                    })
                })
            }
            if (document.querySelectorAll('.timeBlk button').length > 0) {
                let rmBtns = document.querySelectorAll('.timeBlk button');
                rmBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        btn.parentElement.remove() 
                    SetListNumbs()
                    })
                })
            }
        }
        TimeTableedits()
        if (document.querySelectorAll('.addLessionNow').length > 0) {
            let AddLessionBtn = document.querySelector('.addLessionNow')
            AddLessionBtn.addEventListener('click', (e) => {  
                let putIn = document.querySelector('.tijdsblokken.timings_mdl .theListsOfSchedule') 
                let makeDiv = document.createElement('LI')
                makeDiv.innerHTML = `<div class="timeBlk">
                            <b class="nmb">4</b>
                            <div>
                                <input type="text" value="09:00">
                                <b>-</b>
                                <input type="text" value="10:00">
                            </div>
                            <button type="button"><i class="far fa-trash"></i></button>
                        </div>`
                putIn.appendChild(makeDiv) 
                TimeTableedits()
                SetListNumbs()
            })
        }
        if (document.querySelectorAll('.takeBreak').length > 0) {
            let AddLessionBtn = document.querySelector('.takeBreak')
            AddLessionBtn.addEventListener('click', (e) => {  
                let putIn = document.querySelector('.tijdsblokken.timings_mdl .theListsOfSchedule') 
                let makeDiv = document.createElement('LI')
                makeDiv.innerHTML = `<div class="timeBlk disabled">
                            <b class="nmb">4</b>
                            <div>
                                <input type="text" value="09:00">
                                <b>-</b>
                                <input type="text" value="10:00">
                            </div>
                            <button type="button"><i class="far fa-trash"></i></button>
                        </div>`
                putIn.appendChild(makeDiv) 
                TimeTableedits()
                SetListNumbs()
            })
        }
        if (document.querySelectorAll('.inpSrc input').length > 0) {
            let alInputs = document.querySelectorAll('.inpSrc input')
            let keepList = [];
            alInputs.forEach(inp => {
                inp.addEventListener('keyup', (e) =>{

                    let contents_list = inp.parentElement.querySelector('ul');
                    let contents = inp.parentElement.querySelectorAll('ul li b');
                    let tVl = e.target.value.toLocaleLowerCase();
                    console.log(tVl)
                    contents.forEach(bs => {
                        if (tVl.length > 0 && bs.textContent.toLocaleLowerCase().match(tVl)) {
                            bs.parentElement.classList.add('show')
                            contents_list.classList.add('show')
                        }else{
                            bs.parentElement.classList.remove('show')
                            contents_list.classList.remove('show')
                        }
                    });
                })
            })
        }

        if (document.querySelectorAll('.inpSrc').length > 0) {
            let selectOpt = document.querySelectorAll('.inpSrc ul li')
            selectOpt.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let parentDiv = btn.parentElement.parentElement;
                    parentDiv.querySelector('input').value = btn.querySelector('b').textContent;
                    parentDiv.querySelector('ul').classList.toggle('show')

                })
            })
        }
    }
    ScheduleTimeTable()


    // Capacity 
    CapacityChange()
    function CapacityChange() {
        if (document.querySelector('.capacityLabel')) { 
            let Cpct = document.querySelector('.capacityLabel')
            let select = Cpct.querySelector('select')
            let Img = Cpct.querySelector('img')
            select.addEventListener('change', (e) => {
                Img.src = e.target.value;
            })
        }
    }   
 
    // Edit mode setup 
    if ($('.goToEdit').length > 0) {
        let EBTN = $('.goToEdit'); 
        //   https://codepen.io/caseymhunt/pen/ARgpxO
        let AllEdBtns = document.querySelectorAll('.goToEdit');
        // goToEdit
        AllEdBtns.forEach(EdBtn => {
            EdBtn.addEventListener('click', () => { 
                if (EdBtn.parentElement.classList.contains('lktAFrm')) {
                    $('body').toggleClass('editmode')
                    let AddClasses = EdBtn.parentElement;
                    AddClasses.classList.toggle('notEditing')
                }else if (EdBtn.parentElement.parentElement.classList.contains('lktAFrm')) {
                    $('body').toggleClass('editmode')
                    let AddClasses = EdBtn.parentElement.parentElement;
                    AddClasses.classList.toggle('notEditing')
                } else if (EdBtn.parentElement.parentElement.parentElement.classList.contains('lktAFrm')) {
                    $('body').toggleClass('editmode')
                    let AddClasses = EdBtn.parentElement.parentElement.parentElement;
                    AddClasses.classList.toggle('notEditing')
                } else if (EdBtn.parentElement.parentElement.parentElement.parentElement.classList.contains('lktAFrm')) {
                    $('body').toggleClass('editmode')
                    let AddClasses = EdBtn.parentElement.parentElement.parentElement.parentElement;
                    AddClasses.classList.toggle('notEditing')
                }
            })
        })
    
    }

    // Custom filter menus
    function TheFilterDropdown() {
        if (document.querySelectorAll('.wDRP').length > 0) {
            let pDiv = document.querySelector('.wDRP').parentElement
            let MDiv = document.querySelector('.wDRP')
            let InPhidden = MDiv.querySelector('input[type="hidden"]')
            let MainFLists= pDiv.querySelector('.snTgs')
            let FLists = MDiv.querySelectorAll('ul li')
            FLists.forEach(list => {
                list.addEventListener('click', (e) => {
                    MainFLists.innerHTML = ""
                    InPhidden.value = ""
                    let target = e.target
                    target.classList.toggle('active')
                    let ActiveFLists = MDiv.querySelectorAll('ul li.active')
                    let keep = [];
                    ActiveFLists.forEach(list => {
                        keep.push(list.textContent)
                    }); 
                    InPhidden.value = keep
                    keep.forEach(btN => {
                        let Btn = document.createElement("BUTTON")
                        Btn.setAttribute('type',"button")
                        Btn.classList.add('tgs')
                        Btn.innerHTML = `${btN}`
                        MainFLists.append(Btn)
                    }) 
                    
                    RemoveTgs()
                })
            })

            function RemoveTgs() { 
                if (pDiv.querySelectorAll('.snTgs button').length > 0) { 
                    let MainFList_s= pDiv.querySelectorAll('.snTgs button')
                    let FLst = MDiv.querySelectorAll('ul li.active')
                    MainFList_s.forEach(Fbtn => {
                        Fbtn.addEventListener('click', (e) => {
                            let input = Fbtn.parentElement.parentElement.querySelector('input[type="hidden"]') 
                            let store = []
                            FLst.forEach(mtc => {
                                if (Fbtn.textContent == mtc.textContent) {
                                    mtc.classList.remove('active')
                                }else{
                                    store.push(mtc.textContent)
                                }
                            })
                            input.value = store 
                            Fbtn.remove()
                        })
                    })
                }
            }

        }
    }
    TheFilterDropdown()

    // Change input types in editing mode
    function ChangeInpTyps() {
        
        if ($('.IntoTime').length > 0) {
            if ($('.IntoTime').attr('type') == "text") {
                $('.IntoTime').attr('type', 'time')
            }else{
                $('.IntoTime').attr('type', 'text')
            } 
        } 

        if ($('.IntoSelect').length > 0) {
            let SInps = document.querySelectorAll('.IntoSelect')
            if ($('.IntoSelect').attr('type') == "text") {
                
                SInps.forEach(inp => {
                    inp.parentElement.classList.add('showSelection') 
                })
                $('.IntoSelect').attr('type',"selection")
            }else{ 
                SInps.forEach(inp => {
                    inp.parentElement.classList.remove('showSelection') 
                })
                $('.IntoSelect').attr('type',"text")
            } 
            let Selects = document.querySelectorAll('.withIntoSelect')
            Selects.forEach(select => {
                select.addEventListener("change", (e) => {
                    e.target.parentElement.querySelector('input').value = e.target.value;
                })
            })

        }
    }
    ChangeInpTyps()


    function FormValidation() {
        if (document.querySelectorAll('.needs-validation').length > 0) {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
                })
        }
    }
    FormValidation()

    // Show more or less
    function ShowMoreLess() { 
        if (document.querySelectorAll('.showMoreLessNow').length > 0) {
            let ManagersBtn = document.querySelectorAll('.showMoreLessNow')
            ManagersBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentElement.parentElement.parentElement.classList.toggle('showMore')
                })
            });
        }
    }
    ShowMoreLess()


    // Time Range
    function TheTimeRange() {
        
        $(".slider-range").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [540, 1020],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';
                if (hours1 >= 24) {
                    if (hours1 == 24) {
                        hours1 = hours1;
                        minutes1 = minutes1;
                    } else {
                        hours1 = hours1 - 12;
                        minutes1 = minutes1;
                    }
                } else {
                    hours1 = hours1;
                    minutes1 = minutes1;
                }
                if (hours1 == 0) {
                    hours1 = 0;
                    minutes1 = minutes1;
                }



                $('.st').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                if (hours2 >= 24) {
                    if (hours2 == 24) {
                        hours2 = hours2;
                        minutes2 = minutes2;
                    } else if (hours2 == 24) {
                        hours2 = 11;
                        minutes2 = "59";
                    } else {
                        hours2 = hours2 - 12;
                        minutes2 = minutes2;
                    }
                } else {
                    hours2 = hours2;
                    minutes2 = minutes2;
                }

                $('.st1_1').html(hours2 + ':' + minutes2);
            }
        });
        $(".slider-range-2").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [540, 1020],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';
                if (hours1 >= 24) {
                    if (hours1 == 24) {
                        hours1 = hours1;
                        minutes1 = minutes1;
                    } else {
                        hours1 = hours1 - 12;
                        minutes1 = minutes1;
                    }
                } else {
                    hours1 = hours1;
                    minutes1 = minutes1;
                }
                if (hours1 == 0) {
                    hours1 = 0;
                    minutes1 = minutes1;
                }



                $('.st2').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                if (hours2 >= 24) {
                    if (hours2 == 24) {
                        hours2 = hours2;
                        minutes2 = minutes2;
                    } else if (hours2 == 24) {
                        hours2 = 11;
                        minutes2 = "59";
                    } else {
                        hours2 = hours2 - 12;
                        minutes2 = minutes2;
                    }
                } else {
                    hours2 = hours2;
                    minutes2 = minutes2;
                }

                $('.st2_2').html(hours2 + ':' + minutes2);
            }
        });
        $(".slider-range-3").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [540, 1020],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';
                if (hours1 >= 24) {
                    if (hours1 == 24) {
                        hours1 = hours1;
                        minutes1 = minutes1;
                    } else {
                        hours1 = hours1 - 12;
                        minutes1 = minutes1;
                    }
                } else {
                    hours1 = hours1;
                    minutes1 = minutes1;
                }
                if (hours1 == 0) {
                    hours1 = 0;
                    minutes1 = minutes1;
                }



                $('.st3').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                if (hours2 >= 24) {
                    if (hours2 == 24) {
                        hours2 = hours2;
                        minutes2 = minutes2;
                    } else if (hours2 == 24) {
                        hours2 = 11;
                        minutes2 = "59";
                    } else {
                        hours2 = hours2 - 12;
                        minutes2 = minutes2;
                    }
                } else {
                    hours2 = hours2;
                    minutes2 = minutes2;
                }

                $('.st3_2').html(hours2 + ':' + minutes2);
            }
        });
        $(".slider-range-4").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [540, 1020],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';
                if (hours1 >= 24) {
                    if (hours1 == 24) {
                        hours1 = hours1;
                        minutes1 = minutes1;
                    } else {
                        hours1 = hours1 - 12;
                        minutes1 = minutes1;
                    }
                } else {
                    hours1 = hours1;
                    minutes1 = minutes1;
                }
                if (hours1 == 0) {
                    hours1 = 0;
                    minutes1 = minutes1;
                }



                $('.st4').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                if (hours2 >= 24) {
                    if (hours2 == 24) {
                        hours2 = hours2;
                        minutes2 = minutes2;
                    } else if (hours2 == 24) {
                        hours2 = 11;
                        minutes2 = "59";
                    } else {
                        hours2 = hours2 - 12;
                        minutes2 = minutes2;
                    }
                } else {
                    hours2 = hours2;
                    minutes2 = minutes2;
                }

                $('.st4_2').html(hours2 + ':' + minutes2);
            }
        });
        $(".slider-range-5").slider({
            range: true,
            min: 0,
            max: 1440,
            step: 15,
            values: [540, 1020],
            slide: function (e, ui) {
                var hours1 = Math.floor(ui.values[0] / 60);
                var minutes1 = ui.values[0] - (hours1 * 60);

                if (hours1.length == 1) hours1 = '0' + hours1;
                if (minutes1.length == 1) minutes1 = '0' + minutes1;
                if (minutes1 == 0) minutes1 = '00';
                if (hours1 >= 24) {
                    if (hours1 == 24) {
                        hours1 = hours1;
                        minutes1 = minutes1;
                    } else {
                        hours1 = hours1 - 12;
                        minutes1 = minutes1;
                    }
                } else {
                    hours1 = hours1;
                    minutes1 = minutes1;
                }
                if (hours1 == 0) {
                    hours1 = 0;
                    minutes1 = minutes1;
                }



                $('.st5').html(hours1 + ':' + minutes1);

                var hours2 = Math.floor(ui.values[1] / 60);
                var minutes2 = ui.values[1] - (hours2 * 60);

                if (hours2.length == 1) hours2 = '0' + hours2;
                if (minutes2.length == 1) minutes2 = '0' + minutes2;
                if (minutes2 == 0) minutes2 = '00';
                if (hours2 >= 24) {
                    if (hours2 == 24) {
                        hours2 = hours2;
                        minutes2 = minutes2;
                    } else if (hours2 == 24) {
                        hours2 = 11;
                        minutes2 = "59";
                    } else {
                        hours2 = hours2 - 12;
                        minutes2 = minutes2;
                    }
                } else {
                    hours2 = hours2;
                    minutes2 = minutes2;
                }

                $('.st5_2').html(hours2 + ':' + minutes2);
            }
        });
    }
    TheTimeRange()


    window.addEventListener('mousemove', (e) => {
        if (document.querySelectorAll('.a_bar').length > 0) { 
            let bar = document.querySelector('.a_bar')
            if (200 > e.pageY) {
                bar.classList.add('show')
            }else{
                bar.classList.remove('show')
            }
        }
    })
    
    $( ".droppable-area1, .droppable-area2" ).sortable({
        connectWith: ".connected-sortable",
        stack: '.connected-sortable ul'
        }).disableSelection();


    
    
    ShowPopupHash()
    function ShowPopupHash() { 
        if (window.location.hash && window.location.hash === "#success" || window.location.hash === "#failed") {
            if (document.querySelectorAll('.showWithHash').length > 0) {
                let theURL = window.location.href;
                let theURLHash = window.location.hash;
                let showPopup = document.querySelector('.showWithHash')
                if (window.location.hash === "#success") {
                    showPopup.classList.add('show_success')
                }else if(window.location.hash === "#failed"){
                    showPopup.classList.add('show_failed')
                }
                let ThePopupClose = document.querySelectorAll('.closeThisPopup')
                ThePopupClose.forEach(cls => {
                    cls.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (window.location.hash === "#success") {
                            showPopup.classList.remove('show_success')
                            window.location.assign(theURL.replace("#success","")); 
                        }else if(window.location.hash === "#failed"){
                            showPopup.classList.remove('show_failed')
                            window.location.assign(theURL.replace("#failed","")); 
                        }
                    })
                })

            }
        } 
    }



    // StepForm 
    let closeNow = document.querySelectorAll('.ResetPopup');
    if (closeNow) { 
        closeNow.forEach(btn => {
            btn.addEventListener('click', () => {
                ResetStepPopupAll()
            })
        })
    }
    function ResetStepPopupAll() {
        let MainSteps = document.querySelector('.formSteps')
        let AllDOts = document.querySelector('.stepDots') 
        function StepReset() { 
            if (MainSteps) { 
                if (MainSteps.classList.contains('firstStep')) {
                    MainSteps.classList.remove('firstStep')
                }
                if (MainSteps.classList.contains('LastStep')) {
                    MainSteps.classList.remove('LastStep')
                }
                let allSteps = MainSteps.querySelectorAll('.step')
                allSteps.forEach(AlStep => {
                    AlStep.classList.remove('active')
                });
                allSteps[0].classList.add('active')
                if (document.querySelectorAll('.stepDots').length > 0) {
                    let allDots = AllDOts.querySelectorAll('.dt')
                    allDots.forEach(Dt => {
                        Dt.classList.remove('active')
                    });
                    allDots[0].classList.add('active') 
                }
            }
        }
        StepReset()
        function SuccessPopup() {
            let Modal = document.querySelector('.modal.showSuccessnOW')
            if (Modal) {
                Modal.classList.remove('showSuccessnOW')
            }
            if (document.querySelectorAll('.showSuccessnOW').length > 0) {
                
                document.querySelectorAll('.showSuccessnOW').forEach(el => {
                    el.classList.remove('showSuccessnOW')
                })
            }

        }
        SuccessPopup()
    }
    function StepForm() { 
        if (document.querySelectorAll('.formSteps').length > 0) { 
            let MainSteps = document.querySelector('.formSteps')
            let AllDOts = document.querySelector('.stepDots')
            let NextBtns = MainSteps.querySelectorAll('.nextStep') 
            if (MainSteps.querySelectorAll('.nextStep') && MainSteps.querySelectorAll('.nextStep').length > 0) { 
                NextBtns.forEach(NextBtn => { 
                    NextBtn.addEventListener('click', (e) => { 
                        function StepChange() { 
                            let AllSteps = MainSteps.querySelectorAll('.step');
                            let StepActive = MainSteps.querySelector('.step.active');

                            if (StepActive.nextElementSibling.classList.contains('endStep')) {
                                MainSteps.classList.add('LastStep')
                            }

                            if (StepActive.nextElementSibling.classList.contains('step')) {
                                StepActive.nextElementSibling.classList.add('active')
                                StepActive.classList.remove('active') 
                                MainSteps.classList.remove('firstStep')
                            }else{
                                AllSteps[0].classList.add('active')  
                                MainSteps.classList.add('firstStep')
                                MainSteps.classList.remove('LastStep')
                            }
                        }
                        StepChange()
                        function DotChange() { 
                            if (document.querySelectorAll('.dt').length > 0) { 
                                let AllSDotss = AllDOts.querySelectorAll('.dt');
                                let DotActive = AllDOts.querySelector('.dt.active');
                                
                                if (DotActive.nextElementSibling && DotActive.nextElementSibling.classList.contains('dt')) {
                                    DotActive.nextElementSibling.classList.add('active')
                                    DotActive.classList.remove('active')
                                }else{
                                    AllSDotss[0].classList.add('active')
                                    DotActive.classList.remove('active')
                                }
                            }
                        }
                        DotChange()
                    
                    })
                })
            }
            if (MainSteps.querySelector('.prevNext') && MainSteps.querySelectorAll('.prevNext').length > 0) { 
                let PrevBtns = MainSteps.querySelectorAll('.prevNext')
                PrevBtns.forEach(PrevBtn => { 
                    PrevBtn.addEventListener('click', (e) => {
                        function StepChange() { 
                            let AllSteps = MainSteps.querySelectorAll('.step');
                            let StepActive = MainSteps.querySelector('.step.active'); 
                            if (StepActive.previousElementSibling.classList.contains('startStep')) {
                                MainSteps.classList.add('firstStep')
                                MainSteps.classList.remove('LastStep') 
                            } 
                            if (StepActive.previousElementSibling.classList.contains('step')) {
                                StepActive.previousElementSibling.classList.add('active')
                                StepActive.classList.remove('active')
                            }else{
                                AllSteps[0].classList.add('active') 
                            }
                        }
                        StepChange()
                        function DotChange() { 
                            if (document.querySelectorAll('.dt').length > 0) { 
                                let AllSDotss = AllDOts.querySelectorAll('.dt');
                                let DotActive = AllDOts.querySelector('.dt.active');
                                
                                if (DotActive.previousElementSibling && DotActive.previousElementSibling.classList.contains('dt')) {
                                    DotActive.previousElementSibling.classList.add('active')
                                    DotActive.classList.remove('active')
                                }else{
                                    AllSDotss[0].classList.add('active')
                                    DotActive.classList.remove('active')
                                }
                            }
                        }
                        DotChange()
                    
                    })
                });
            } 
        }
    } 
    StepForm()


    //   Multi Func Modal
    let MultiFuncPopup = document.querySelectorAll('.withResetTheMultiFuncPopup')
    MultiFuncPopup.forEach(btn => {
        btn.addEventListener('click', () => {
            ResetMultiFuncMdl()
        })
    })
    function MultiFUncMdl() { 
        if (document.querySelectorAll('.connectStep2').length > 0) {
            let MainBlk = document.querySelector('.multiFuncStepHere')

            let StepOf2MainDiv = document.querySelector('.steps2') 
            let StepOf2Btns = document.querySelectorAll('.connectStep2')

            let StepOf3MainDiv = document.querySelector('.steps3') 
            let StepOf3Btns = document.querySelectorAll('.connectStep3')

            StepOf2Btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (StepOf2MainDiv.querySelector('.step2.active')) { 
                        let activeStep = StepOf2MainDiv.querySelector('.step2.active'); 
                        activeStep.classList.remove('active')
                        activeStep.nextElementSibling.classList.add('active') 
                    }else{ 
                        if (StepOf2MainDiv.querySelectorAll('.step2').length > 0) {
                            let AllOfSteps = StepOf2MainDiv.querySelectorAll('.step2');
                            if (MainBlk.classList.contains('connected_steps_3')) {
                                MainBlk.classList.remove('connected_steps_3')
                                MainBlk.classList.add('connected_steps_2')
                                AllOfSteps[0].classList.add('active')  
                            }else{
                                MainBlk.classList.add('connected_steps_2')
                                AllOfSteps[0].classList.add('active')  
                            }
                        }
                    }
                    
                })
            });
            StepOf3Btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (StepOf3MainDiv.querySelector('.step3.active')) { 
                        let activeStep = StepOf3MainDiv.querySelector('.step3.active'); 
                        activeStep.classList.remove('active')
                        activeStep.nextElementSibling.classList.add('active') 
                    }else{ 
                        if (StepOf3MainDiv.querySelectorAll('.step3').length > 0) {
                            let AllOfSteps = StepOf3MainDiv.querySelectorAll('.step3');
                            if (MainBlk.classList.contains('connected_steps_2')) {
                                MainBlk.classList.remove('connected_steps_2')
                                MainBlk.classList.add('connected_steps_3')
                                AllOfSteps[0].classList.add('active')  
                            }else{
                                MainBlk.classList.add('connected_steps_3')
                                AllOfSteps[0].classList.add('active')  
                            }
                        }
                    }
                    
                })
            });
            
        } 
    }
    MultiFUncMdl()
    function ResetMultiFuncMdl() {
        if (document.querySelectorAll('.multiFuncStepHere').length > 0) {
            let MainBlk = document.querySelector('.multiFuncStepHere')
            if (MainBlk.classList.contains('connected_steps_2')) {
                MainBlk.classList.remove('connected_steps_2')
            }
            if (MainBlk.classList.contains('connected_steps_3')) {
                MainBlk.classList.remove('connected_steps_3')
            }
            document.querySelectorAll('.step2').forEach(lst => {
                lst.classList.remove('active')
            }); 
            document.querySelectorAll('.step3').forEach(lst => {
                lst.classList.remove('active')
            }); 
        }
    }
 



  
 
})(jQuery);
