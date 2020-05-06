import { Injectable } from "@angular/core";
import { Agent } from "../models/agent.model";

@Injectable()
export class PropertiesService {
      private agents: Agent[] = [
            new Agent(
                  "56643",
                  "Katerina",
                  "Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.",
                  1 - 254 - 845665,
                  1 - 22639 - 5252,
                  "katerina@gmail.com",
                  "15421 Southwest 39th Terrace, Miami, FL, USA",
                  "rtgdfbgregte",
                  "rhrhrtbgrfb"
            )
      ];

      getAgents(): Agent[] {
            return this.agents;
      }

      getAgent(id: String): Agent {
            return this.agents.find(p => p.agentID == id);
      }
}