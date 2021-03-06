package fr.cea.ig.grools.reporter;

import fr.cea.ig.grools.fact.PriorKnowledge;
import lombok.Data;
import lombok.NonNull;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Data
public class FunctionalUnitStats {

    private final Map<String,Float> conclusionsStats;
    private final EnumMap<SensitivitySpecificity,List<PriorKnowledge>> leavesClass;

    public FunctionalUnitStats( @NonNull final Map<String,Float> conclusionsStats, @NonNull final EnumMap<SensitivitySpecificity,List<PriorKnowledge>> leavesClass ){
        this.conclusionsStats    = conclusionsStats;
        this.leavesClass         = leavesClass;
    }
}
