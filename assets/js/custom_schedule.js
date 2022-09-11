function ScheduleDrag_N_Drop() {
    let All_schedules_list = document.querySelectorAll('.schedule-blk')

    if (All_schedules_list.length> 0) {
        All_schedules_list.forEach(schedule_main_block => {
        
            function DragDrop_from_left() { 
                let Schedule_table = schedule_main_block.querySelectorAll('.schedule_tble tbody tr td')
                let ScheduleLists  = schedule_main_block.querySelectorAll('.schedule_list_creats li')

                // Replace the spaces
                function RemoveSpaceBreak(contents) {
                    return contents.replaceAll( /[\r\n]+/gm, "" )
                }

                // Drag lists from left side 
                let storDataHere   = [];

                ScheduleLists.forEach(ScheduleList => {
                    ScheduleList.addEventListener('dragstart', (e) => {
                        console.log('dragging started')
                        let target      = e.target;
                        let texts       = target.querySelectorAll('span')  
                        target.classList.add('dragging')
                        storDataHere = [ RemoveSpaceBreak(texts[0].textContent),RemoveSpaceBreak(texts[1].textContent),Math.random(0,1000000)]
                        
                    })
                    ScheduleList.addEventListener('dragend', (e) => {
                        console.log('dragging ended')
                        e.target.classList.remove('dragging')
                        DragDrop_from_schedule()
                    })
                });
                // Drop lists from left side
                Schedule_table.forEach(dropeHere => {
                    dropeHere.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        let target = e.target;
                        if (!target.querySelectorAll('.schdBlk').length > 0 && !target.classList.contains('schdBlk')) {
                            target.classList.add('contentOnThis') 
                        }
                        
                    })
                    dropeHere.addEventListener('dragenter', (e) => {
                        // console.log('dragging enter')
                    })
                    dropeHere.addEventListener('dragleave', (e) => {
                        // console.log('dragging enter')
                        e.target.classList.remove('contentOnThis')
                    })
                    dropeHere.addEventListener('drop', (e) => { 
                        let target = e.target;
                        if (target.classList && target.querySelectorAll('.schdBlk').length > 0) {
                            console.log('already avileable')
                        }else if (target.classList && target.classList.contains('schdBlk')) {
                            console.log("can't drop")
                        }else{
                            let Div = document.createElement('div')
                            Div.classList.add('schdBlk')
                            Div.setAttribute('data-bs-toggle',"modal")
                            Div.setAttribute('data-bs-target',"#GroapViewMdl")
                            Div.setAttribute('draggable',"true")
                            Div.innerHTML = `
                                <span>Lokaal</span>
                                <b>${storDataHere[0]}</b>
                                <span>${storDataHere[1]}</span>
                            `
                            target.append(Div)
                            target.setAttribute('data-id',storDataHere[2]) 
                        }
                        e.target.classList.remove('contentOnThis')
                        
                        $('#GroapViewMdl').modal('show');
                    })
                });
            }
            
            DragDrop_from_left()

            function DragDrop_from_schedule(){
                let dropsHere = schedule_main_block.querySelectorAll('.schedule_tble tbody tr td')
                let dragable  = schedule_main_block.querySelectorAll('.schdBlk')

                let storDataHere   = [];

                // Drag the items
                dragable.forEach(item => {
                    item.addEventListener('dragstart', (e) => { 
                        let target = e.target;
                        let cln    = target.cloneNode(true)
                        storDataHere = [cln] 
                        target.parentElement.classList.add('dropped_this_into_another_schedule')
                    })
                    item.addEventListener('dragend', (e) => {
                        let target = e.target;
                        console.log('end scedule',storDataHere) 
                        DragDrop_from_schedule()
                    })
                });

                // Drop the items
                dropsHere.forEach(d_place => {
                    d_place.addEventListener('dragover', (e) => {
                        e.preventDefault()
                        let target = e.target;
                        if (target.classList.contains('schdBlk')) {
                            target.parentElement.classList.add('contentOnThis') 
                        }else{
                            target.classList.add('contentOnThis')
                        }
                    })
                    d_place.addEventListener('dragleave', (e) => {
                        let target = e.target; 
                        target.classList.remove('contentOnThis')
                    })
                    d_place.addEventListener('drop', (e) => {
                        let target = e.target; 
                        let DraggedElement = storDataHere[0]
                        if (storDataHere.length > 0) { 
                            if (target.querySelectorAll('.schdBlk').length > 0) {
                                console.log(target)
                                let scBlk       = target.querySelector('.schdBlk')
                                let KeepClone   = scBlk.cloneNode(true)
                                scBlk.remove()
                                target.append(DraggedElement)

                                if (schedule_main_block.querySelectorAll('.dropped_this_into_another_schedule').length > 0) {

                                    console.log('geting data',DraggedElement)

                                    let findTheElement = schedule_main_block.querySelector('.dropped_this_into_another_schedule')
                                    console.log('working',findTheElement)
                                    findTheElement.innerHTML = " "
                                    findTheElement.append(KeepClone)

                                    findTheElement.classList.remove('dropped_this_into_another_schedule')
                                    if (findTheElement.querySelectorAll('.schdBlk').length > 0) {
                                        let scBlk = findTheElement.querySelector('.schdBlk b')
                                        if (scBlk.textContent === "undefined") {
                                            findTheElement.innerHTML = " " 
                                        }
                                    }
                                }

                            } 
                        } 
                        target.classList.remove('contentOnThis')
                        $('#GroapViewMdl').modal('show');

                    })
                })

            } 
            DragDrop_from_schedule()
        });
    }

}
ScheduleDrag_N_Drop()