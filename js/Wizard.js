function Wizard(wz,id){
    this.name = wz.name; 
    this.fields = wz.fields;
    this.id = id;
}

Wizard.prototype.render = function render (btn) {
    var $content = $(`<div class="container-fluid wizard" data-wizard=${this.name}>
                <div class="row actions action-top"></div>
                <div class="row form-content"><h1>${this.name}</h1></div>
                <div class="row actions action-bottom"></div>
            </div>`)


    $.each(btn.top, function(i, btn){
        $content.find('.action-top').append(actionTemplate(btn))
    })
    let bBtnCol = (12/btn.bottom.length);
    $.each(btn.bottom, function(i, btn){
        $content.find('.action-bottom').append(actionTemplate(btn, bBtnCol))
    })

    let form = new Form(this.fields, this.id);
    let $form = form.render();
    $content.find('.form-content').append($form)

    return $content;
}

function actionTemplate(btn, col){
    return `<div class="col-md-${col} col-sm-12">
            <input type="button" name="" data-action="${btn.action}" class="btn btn-primary form-control" id="" value="${btn.label}">
        </div>`
}

