# Auditoria de desempenho — 21 de Agosto de 2026

## Evidência recolhida na versão publicada antes da optimização

Na homepage publicada, a cronologia de recursos revelou várias fotografias fora do primeiro ecrã a serem descarregadas durante a carga inicial. Entre os recursos mais lentos observados estavam a fotografia comunitária (**783 ms**), três fotografias da secção Lumi (**638–646 ms**), a fotografia do NASA Space Apps (**646 ms**) e a fotografia dos fundadores (**634 ms**).

O recurso JavaScript principal apresentou cerca de **470 816 bytes descodificados** e a folha de estilos cerca de **139 275 bytes descodificados**. Não foram observados erros de consola da aplicação durante a medição. Estes dados confirmam que a transferência e descodificação simultânea das fotografias secundárias era o principal factor evitável de peso inicial e de trabalho visual durante o scroll.

## Correcções aplicadas

As fotografias fora do primeiro ecrã passaram a usar `loading="lazy"` e `decoding="async"`. A fotografia dos fundadores mantém prioridade alta no hero. As fontes são agora descobertas directamente no documento inicial, e foi adicionada uma política de movimento reduzido para dispositivos que a solicitam.
