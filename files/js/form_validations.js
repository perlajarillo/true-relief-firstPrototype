
    function cancelForm()
    {
        window.location="index.html";
    }

    //Validation
    function validaEmpty(string){
    if (!string.localeCompare("")) {
            return false;
        }
        else 
        {
            return true;
        }
  }