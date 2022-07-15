import chalk from 'chalk';
import boxen from 'boxen';
import dedent from 'ts-dedent';
import Table from 'cli-table3';
import ip from 'ip';

export function outputStartupInformation(options: {
  name: string;
  port: number;
}) {
  const { name, port } = options;

  const serveMessage = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      middle: '',
    },
    // @ts-ignore
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  const { address, networkAddress } = getServerAddresses(port);

  serveMessage.push(
    ['Welcome to:', chalk.blue.bold(name)],
    ['Local:', chalk.cyan(address)],
    ['On your network:', chalk.cyan(networkAddress)],
  );

  console.log();
  console.log(
    boxen(
      dedent`
          ${serveMessage.toString()}
        `,
      { borderStyle: 'round', padding: 1, borderColor: '#F1618C' } as any,
    ),
  );
  console.log();
}

const getServerAddresses = (port: number) => {
  return {
    address: `http://localhost:${port}/graphql`,
    networkAddress: `http://${ip.address()}:${port}/graphql`,
  };
};
