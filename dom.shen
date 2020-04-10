(define domdemo ->
  (dom.append
    (dom.query "#workspace")
    (dom.build [div [@id "button-area"]
                    [input [@type "text"]
                           [@value "text"]]
                    [br]
                    [input [@type "button"]
                           [@value "button"]
                           [!click (/. _ (output "button has been clicked~%"))]]])))
