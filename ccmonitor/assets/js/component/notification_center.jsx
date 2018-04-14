import React from 'react';

class NotificationCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="notification-panel">
      <div class="table-row">
        <div class="column">#</div>
        <div class="wrapper attributes">
          <div class="wrapper title-alertmessage-module-reporter">
            <div className="alertmessage">Alert</div>
          </div>
          <div class="wrapper status">
            <div class="column status">Status</div>
          </div>
        </div>
        <div class="wrapper icons">
          <div title="Add alertmessage" class="column check-alertmessage">
            Message
          </div>
        </div>
        <div class="wrapper dates">
          <div class="column date">Created</div>
          <div class="column date">Updated</div>
        </div>

        <div class="wrapper icons">
          <div class="column check-alertmessage"></div>
        </div>
      </div>

      <div class="table-row">
        <div class="column">1</div>
        <div class="wrapper attributes">
          <div class="wrapper title-alertmessage-module-reporter">
            <div class="column alertmessage">Type: ascending Threshold: $7000</div>
          </div>
          <div class="wrapper status">
            <div class="column status"><span class="label label-primary">Completed</span></div>
          </div>
        </div>
        <div class="wrapper icons">
          <div class="column check-alertmessage"><span class="glyphicon glyphicon-comment active" /></div>
        </div>

        <div class="wrapper dates">
          <div class="column date">Feb-1, 2016</div>
          <div class="column date">Mar-13, 2016</div>
        </div>

        <div class="wrapper icons">
          <div class="column check-alertmessage"><i className="fa fa-trash"></i></div>
        </div>
      </div>

      <div class="table-row">
        <div class="column">2</div>
        <div class="wrapper attributes">
          <div class="wrapper title-alertmessage-module-reporter">
            <div class="column alertmessage">Type: descending Threshold: $6800</div>
          </div>
          <div class="wrapper status">
            <div class="column status"><span class="label label-success">Monitoring</span></div>
          </div>
        </div>
        <div class="wrapper icons">
          <div class="column check-alertmessage"><span class="glyphicon glyphicon-comment" /></div>
        </div>
        <div class="wrapper dates">
          <div class="column date">Mar-3, 2016</div>
          <div class="column date"></div>
        </div>
        <div class="wrapper icons">
          <div class="column check-alertmessage"><i className="fa fa-trash"></i></div>
        </div>
      </div>
    </div>

  }
}

export default NotificationCenter;
