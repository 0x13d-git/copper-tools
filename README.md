# copper-tools

The various copper packages in one repo. Used to power Copper-Ops Platform

## copper-shell
```
// shell - fluentui
```

## copper-machines

```
// xstate
// copper-webshell-machine
// copper-vmware-machine
// copper-salesforce-machine
```

## copper-test

```
// xstate test
```

## copper-defense

```
// browswer plugin for CopperOps
```

## copper-strike

```
// mitre
```

Mitre test and evaluation framework. Main value add is NIST Cyber Security Framework, Privacy Framework, and Risk Management Framework correlation.
https://csrc.nist.gov/publications/detail/white-paper/2019/06/11/mitigating-risk-of-software-vulnerabilities-with-ssdf/draft

Exported data can be analyzed in 013xd/copperhead

Run modes: evaluation, service, datastore

An **evaluation** gives prompts to run various Mitre technqiues against a host. Results can be rolled into copper-head for visualization.

A **service** can be thrown onto a server to allow various attacker tools as a service: reverse shell, _benign_ payload download, channels for exfiltration, etc.

A **datastore** is an API for integration into other applications and workflows.

### Buzz Words

- Low-code platform: configure new modules easily. This allows copper-strike to deliver payloads from other attack frameworks.


### Vaporware?

- this an open sourced bare bones version of attack IQ. Designed for redteams.


### Tie ins

### As a learning aid
* https://www.hackthebox.eu/individuals
* https://github.com/so87/Home-Lab/blob/master/development-pipeline.pdf
* https://www.offensive-security.com/pricing/


## copper-ide

```
// vscode
```

## copper-band

```
// elastic search plugin
```

