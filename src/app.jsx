/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from "cockpit";
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
} from "@patternfly/react-core/dist/esm/components/Card/index.js";
import * as service from "service.js";
import Tomcat from "./Tomcat/Tomcat";
import {
  CodeBlock,
  CodeBlockCode,
  Tab,
  TabTitleText,
  Tabs,
  Button,
  SearchInput,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  TabAction,
  Icon,
  Switch,
} from "@patternfly/react-core";
import { IconStatus } from "./IconStatus";
import Httpd from "./Httpd/Httpd";
import Nginx from "./Nginx/Nginx";
import HaProxy from "./Haproxy/HaProxy";
import LetsEncrypt from "./LetsEncrypt/LetsEncrypt";

const _ = cockpit.gettext;

export class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      httpd: false,
      httpdState: '',
      tomcat: false,
      tomcatState: '',
      nginx: false,
      nginxState: '',
      haproxy: false,
      haproxyState: '',
      certbot: false,
      certbotState: '',
      activeTabKey: 0,
      isTabsLightScheme: false,
    };

    const httpdService = service.proxy("httpd");
    httpdService.wait(() => {
      console.dir(httpdService);
      this.setState({ 
        httpd: httpdService.exists,
        httpdState: httpdService.state
     });
    });

    const tomcatService = service.proxy("tomcat");
    tomcatService.wait(() => {
      console.dir(tomcatService);
      this.setState({ 
        tomcat: tomcatService.exists,
        tomcatState: tomcatService.state
     });
    });

    const nginxService = service.proxy("nginx");
    nginxService.wait(() => {
      console.dir(nginxService);
      this.setState({ 
        nginx: nginxService.exists,
        nginxState: nginxService.state
     });
    });

    const haproxyService = service.proxy("haproxy");
    haproxyService.wait(() => {
      console.dir(haproxyService);
      this.setState({ 
        haproxy: haproxyService.exists,
        haproxyState: haproxyService.state
     });
    });
    const certbotService = service.proxy("certbot-renew");
    certbotService.wait(() => {
      console.dir(certbotService);
      this.setState({ 
        certbot: certbotService.exists,
        certbotState: certbotService.state
     });
    });
  }
  
  componentDidMount() {
    console.dir("mounted");
  }
  
  render() {
    const handleTabClick = (event, tabIndex) => {
      this.setState({ activeTabKey: tabIndex });
    };
    
    return (
      <Card>
        <CardTitle>Webservers</CardTitle>
        <CardBody>
          <Tabs
            activeKey={this.state.activeTabKey}
            onSelect={handleTabClick}
            variant={this.state.isTabsLightScheme ? "light300" : "default"}
            isBox
            aria-label="Tabs in the box light variation example"
            role="region"
          >
            <Tab
              eventKey={0}
              title={<TabTitleText>HTTPD</TabTitleText>}
              isDisabled={!this.state.httpd}
              actions={<TabAction><IconStatus state={this.state.httpdState} /></TabAction>}
            >
              <Httpd />
            </Tab>
            <Tab
              eventKey={1}
              title={<TabTitleText>Tomcat</TabTitleText>}
              isDisabled={!this.state.tomcat}
              actions={<TabAction><IconStatus state={this.state.tomcatState} /></TabAction>}
            >
              <Tomcat />
            </Tab>
            <Tab
              eventKey={2}
              title={<TabTitleText>NGINX</TabTitleText>}
              isDisabled={!this.state.nginx}
              actions={<TabAction><IconStatus state={this.state.nginxState} /></TabAction>}
            >
              <Nginx />
            </Tab>
            <Tab
              eventKey={3}
              title={<TabTitleText>HAProxy</TabTitleText>}
              isDisabled={!this.state.haproxy}
              actions={<TabAction><IconStatus state={this.state.haproxyState} /></TabAction>}
            >
              <HaProxy />
            </Tab>
            <Tab
              eventKey={4}
              title={<TabTitleText>Certbot</TabTitleText>}
              isDisabled={!this.state.certbot}
              actions={<TabAction><IconStatus state={this.state.certbotState} /></TabAction>}
            >
              <LetsEncrypt />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    );
  }
}
